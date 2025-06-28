// routes/address.js
const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const token = require('../internal/token');
const AddressHelper = require('../helpers/addressHelper.js');

const router = express.Router();

router.get('/', token.verifyAuthToken, (req, res) => {
    const customerId = req.customer_id;

    console.log("GET /getUserAddresses router hit");
    console.log("Getting address for customer_id:", customerId);

    const db = database();

    db.query(Sql.get_user_address(customerId), (err, result) => {
        db.end();

        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(AddressHelper.parseUserAddress(result));
    });
});

module.exports = router;
