const express = require('express');
const router = express.Router();
const cryptoTransactionController = require("../controllers/cryptoTransactionController")
const priceController = require("../controllers/priceController")
const userController = require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("All is well.")
})

// routes for task 1
router.get("/cryptoTransaction", cryptoTransactionController.getCryptoTransaction);
router.post("/registerTransaction", cryptoTransactionController.registerTransactionAddress);

// routes for task 2
router.get("/priceEtherenum", priceController.getPriceEtherenum);
router.post("/registerPrice", priceController.registerPrice);
router.put("/getEthereumPriceAndUpdate", priceController.getEthereumPrice);

// routes for task 3
router.get("/userDetails/:address", userController.getUserDetails);
router.put("/deals/:address1/:address2", userController.transferTransaction);


module.exports = router;