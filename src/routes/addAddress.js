const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const token = require('../internal/token');
const util = require('../utils/utils.js');

const router = express.Router();

router.post('/', token.verifyAuthToken, (req, res) => {
    const customerId = req.customer_id;
    const address = req.body;
    address.address_id = "ADDR" + util.getRamdomString(6);
    if(address.hasOwnProperty("addr_line1") && address.hasOwnProperty("addr_line2")){
        database.query(Sql.add_new_address(customerId,address))
            .then(result => {
                res.status(200).json({"success" : true});
            })
            .catch(err => {
                res.status(500).json({"error": "Something went wrong"});
            });
    }else{
        res.status(400).json({"error": "Something went wrong"});
    }
});
module.exports = router;