// routes/address.js
const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const token = require('../internal/token');
const AddressHelper = require('../helpers/addressHelper.js');

const router = express.Router();

router.get('/', token.verifyAuthToken, (req, res) => {
    const customerId = req.customer_id;
    database.query(Sql.get_user_address(customerId))
        .then(result => {
            res.status(200).json(AddressHelper.parseUserAddress(result));
        })
        .catch(err => {
            return res.status(500).json({error: err.message});
        });
});

module.exports = router;
