const cryptoTransactionModel = require('../models/cryptoTransactionModel')
const priceModel = require('../models/priceModel')

// Task=> Develop a `GET` API for a user where they give their address as an input and get their current
// balance and current price of ether as output.

const getUserDetails = async (req, res) => {
    try {
        const address = req.params.address
        const found = await cryptoTransactionModel.findOne({ address })

        const balance = found.transaction
        const ethereumPrice = await priceModel.find()
        const price = ethereumPrice[0].ethereum.inr
        const result = {
            userBalance: balance,
            ethreumPrice: price
        }
        return res.status(200).send({ msg: 'user details fetched', data: result })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

//  Transfer Transaction between two users

const transferTransaction = async (req, res) => {
    try {
        if (req.query.condition === 'from') {
            const user1 = await cryptoTransactionModel.findOne({ address: req.params.address1 })
            const user1Money = user1.transaction // money froim add2

            const user2 = await cryptoTransactionModel.findOne({ address: req.params.address2 })
            const user2Money = user2.transaction

            const new1 = {}
            const new2 = {}

            new2.transaction = (+user1Money) + (+user2Money)
            new1.transaction = 0

            await cryptoTransactionModel.findOneAndUpdate({ address: req.params.address1 }, new1)
            await cryptoTransactionModel.findOneAndUpdate({ address: req.params.address2 }, new2)

            const result = await cryptoTransactionModel.findOne({ address: req.params.address1 })
            return res.status(200).send({ data: result })
        } else {
            const sender = await cryptoTransactionModel.findOne({ address: req.params.address2 })
            const senderMoney = sender.transaction

            const reciever = await cryptoTransactionModel.findOne({ address: req.params.address1 })
            const recieverMoney = reciever.transaction

            const update1 = {}; const update2 = {}

            update1.transaction = (+senderMoney) + (+recieverMoney)
            update2.transaction = 0

            await cryptoTransactionModel.findOneAndUpdate({ address: req.params.address1 }, update1)
            await cryptoTransactionModel.findOneAndUpdate({ address: req.params.address2 }, update2)

            const finalData = await cryptoTransactionModel.findOne({ address: req.params.address1 })
            return res.status(200).send({ data: finalData })
        }
    } catch (err) {
        return res.status(500).send({ msg: err.msg })
    }
}
module.exports.getUserDetails = getUserDetails;
module.exports.transferTransaction = transferTransaction;