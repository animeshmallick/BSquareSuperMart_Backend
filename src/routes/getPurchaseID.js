// routes/getPurchaseID.js

const express = require('express');
const token = require('../internal/token'); // Middleware to verify token
const helper = require('../helpers/getPurchaseIdHelper');
const router = express.Router();

// GET route with auth token
router.get('/', token.verifyAuthToken, (req, res) => {
    // Return fixed payment method
    const purchaseID = helper.getPurchaseID();
    res.status(200).json({purchaseID: purchaseID});
});
module.exports = router;
