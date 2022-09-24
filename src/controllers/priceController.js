const axios = require('axios')
const priceModel = require('../models/priceModel')
require('dotenv').config()

// ************* Fetching the price of Ethereum ******************

const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"

const getEthereumPrice = async (req, res) => {
    try {
        const options = {
            method: 'get',
            url: `${API_URL}`

        }
        //console.log("test")
        const result = await axios(options)
        //console.log("test")
        const value = result.data.ethereum.inr
        //console.log(value);
        let update = await priceModel.findOneAndUpdate({ _id: "632f46669c88a85f374c9419" }, {
            $set: {
                ethereum: {
                    inr: value
                }
            }
        }, { new: true })

        res.status(200).send({ status: true, msg: update })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
// Adding the Price in Database

const registerPrice = async (req, res) => {
    try {
        const data = req.body
        const ans = await priceModel.create(data)
        return res.status(201).send(ans)
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

// Fetching the price of Ethereum every 10 minutes

const getPriceEtherenum = async (req, res) => {
    try {
        const result = await priceModel.find()
        res.status(200).send({ data: result })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
module.exports.getPriceEtherenum = getPriceEtherenum;
module.exports.getEthereumPrice = getEthereumPrice;
module.exports.registerPrice = registerPrice;