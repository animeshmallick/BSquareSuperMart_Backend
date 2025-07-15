const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const token = require('../internal/token');

const router = express.Router();

router.post('/', token.verifyAuthToken, (req, res) => {
const customerId = req.customer_id;
const address = req.body;
database.query(Sql.add_new_address(customerId,address))
    .then(result => {
        res.status(200).json({"success" : true});
    })
    .catch(err => {
        res.status(500).json({"error": "Something went wrong"});
    })
});
module.exports = router;