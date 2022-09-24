const mongoose = require('mongoose')

const priceModel = new mongoose.Schema({
  ethereum: {
    inr: {
      type: Number,
    }
  }
}, { timestamps: true })

module.exports = mongoose.model('Ethereum', priceModel)
