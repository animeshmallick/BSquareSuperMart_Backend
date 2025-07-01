// routes/getPaymentMethod.js

const express = require('express');
const token = require('../internal/token'); // Middleware to verify token

const router = express.Router();

// GET route with auth token
router.get('/', token.verifyAuthToken, (req, res) => {
    // Return fixed payment method
    const paymentMethod = [{id: "cod", name: "Pay on Delivery"}];
    res.status(200).json(paymentMethod);
});
module.exports = router;
