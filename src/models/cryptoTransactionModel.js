const mongoose = require('mongoose')

const transactionModel = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    transaction: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('TransactionDetails', transactionModel)
