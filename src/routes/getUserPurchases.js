const database = require('../internal/database.js')
const Sql = require('../resource/sql.js');
const express = require('express');
const token = require("../internal/token");

const router = express.Router();

router.get('/', token.verifyAuthToken, (req, res) => {
    const customerId = req.customer_id;
    database.query(Sql.get_user_purchases(customerId))
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            return res.status(500).json({error: err.message});
        });
});

module.exports = router;