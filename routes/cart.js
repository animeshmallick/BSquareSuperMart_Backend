const database = require('../internal/database.js')
const Sql = require('../internal/sql.js');
const express = require('express');
const cartHelper = require("../helpers/cart.js");

const router = express.Router();

router.post('/', function (req, res, next){
    const product_map = cartHelper.getProductMap(req.body);
    const db = database();
    db.query(Sql.get_all_products_from_ids(Object.keys(product_map)), (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(cartHelper.parseCartResult(result, product_map));
    });
    db.end();
});
router.get('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid Router'})
});
module.exports = router;