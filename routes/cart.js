const database = require('../internal/database.js')
const Sql = require('../internal/sql.js');
const express = require('express');
const cartHelper = require("../helpers/cart.js");

const router = express.Router();

router.post('/', function (req, res, next){
    try {
        const product_map = cartHelper.getProductMap(req.body);
        const db = database();
        db.query(Sql.get_all_products_from_ids(Object.keys(product_map)), (err, result) => {
            res.status(200).json(cartHelper.parseCartResult(result, product_map));
        });
        db.end();
    }catch (err) {res.status(err.statusCode).json({error: err.message})}
});
router.get('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid Router'})
});
module.exports = router;