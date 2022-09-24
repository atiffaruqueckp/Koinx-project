const axios = require("axios")
const cryptoTransactionModel = require("../models/cryptoTransactionModel")
require('dotenv').config()

// Task 1:- ********* Fetch the crypto transaction of a user ************
// Etherscan account => Atif5120,Atif1234@
//API_KEY= M8PFEDUQ65GQ5GDCH43B9R8YBYQ3E3BFR8

const API_KEY = "M8PFEDUQ65GQ5GDCH43B9R8YBYQ3E3BFR8"
//console.log(API_KEY);
const getCryptoTransaction = async (req, res) => {
  try {
    const options = {
      method: 'get',
      url: `https://api.etherscan.io/api?module=account&action=balance&address=0xce94e5621a5f7068253c42558c147480f38b5e0d&tag=latest&apikey=${API_KEY}`
    }
    const result = await axios(options)
    //console.log(result);
    const data = result.data
    console.log(data);
    res.status(200).send({ msg: data, status: true })
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

// Storing Transaction in database.

const registerTransactionAddress = async (req, res) => {
  try {
    if (!req.body.address || !req.body.transaction)
      return res.status(400).send({ msg: 'please provide address and transaction' })

    const data = await cryptoTransactionModel.create(req.body)
    return res.status(201).send({ msg: 'Created Successfully', result: data })

  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}
module.exports.getCryptoTransaction = getCryptoTransaction;
module.exports.registerTransactionAddress = registerTransactionAddress;