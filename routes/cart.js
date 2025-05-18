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
            const cart_products = cartHelper.parseCartProducts(result, product_map);
            const cart_bill = cartHelper.getBill(cart_products);
            const cart_response = {products: cart_products, bill: cart_bill};
            res.status(200).json(cart_response);
        });
        db.end();
    }catch (err) {res.status(err.statusCode).json({error: err.message})}
});
router.get('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid Router'})
});
module.exports = router;