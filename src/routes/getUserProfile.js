const database = require('../internal/database.js')
const Sql = require('../resource/sql.js');
const express = require('express');
const token = require("../internal/token");

const router = express.Router();

router.get('/', token.verifyAuthToken, (req, res) => {
    const customerId = req.customer_id;
    console.log(`Get User Profile for CustomerID : ${customerId}`);
    database.query(Sql.get_user_profile(customerId))
        .then(result => {
            console.log(`User profile fetched : ${result}`);
            res.status(200).json({name: result[0].name, phone: result[0].phone});
        })
        .catch(err => {
            return res.status(500).json({error: err.message});
        });
});

module.exports = router;