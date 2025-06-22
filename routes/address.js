// routes/address.js
const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../internal/sql.js');
const token = require('../internal/token');
const AddressHelper = require('../helpers/addressHelper.js');

const router = express.Router();

router.get('/', token.verifyAuthToken, (req, res) => {
    const customerId = req.customer_id;

    console.log("GET /getuseraddress route hit");
    console.log("Getting address for customer_id:", customerId);

    const db = database();

    db.query(Sql.get_user_address(customerId), (err, result) => {
        db.end();

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const response = AddressHelper.parseUserAddress(result);

        // If addresses are found, return both
        if (response.found) {
            return res.status(200).json({
                userAddress: response.address,
                storeAddress: AddressHelper.defaultAddress
            });
        }

        // If no addresses found, return only store address
        return res.status(200).json({
            storeAddress: AddressHelper.defaultAddress
        });
    });
});

module.exports = router;
