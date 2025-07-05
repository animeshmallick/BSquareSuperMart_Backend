const database = require('../internal/database.js')
const Sql = require('../resource/sql.js');
const express = require('express');
const cartHelper = require("../helpers/cart.js");

const router = express.Router();

router.post('/', function (req, res, next){
    try {
        const product_map = cartHelper.getProductMap(req.body);
        database.query(Sql.get_all_products_from_ids(Object.keys(product_map)))
            .then(result => {
                const cart_response = cartHelper.createCartBill(result, product_map);
                res.status(200).json(cart_response);
            })
            .catch(err => {
                res.status(500).json({error: err.message});
            });
    }catch (err) {res.status(err.statusCode).json({error: err.message})}
});
module.exports = router;