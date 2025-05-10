const database = require('../internal/database.js');
const Sql = require('../internal/sql.js');
const express = require('express');
const logger = require("../utils/logger");

const router = express.Router();
router.post('/', function (req, res, next) {
    const product = req.body;
    const db = database();
    db.query(Sql.check_product_in_database(product), function (err, result) {
        if (err) {
            res.status(500).json({message: 'Something went wrong. Failed to add new product.'});
            return;
        }
        if (result[0]['length'] === 0){
            db.query(Sql.add_new_product_to_db(product), function (err, result) {
                if (err) {
                    res.status(500).json({message: 'Something went wrong.'});
                    return;
                }
                res.status(200).json({message: 'Product Added Successfully'});
            })
        }else {
            res.status(200).json({message: 'Product already exists in Database'});
        }
    })
});
module.exports = router;
