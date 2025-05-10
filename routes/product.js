const database = require('../internal/database.js')
const parseProduct = require('../helpers/productHelper.js');
const Sql = require('../internal/sql.js');
const express = require('express');

const router = express.Router();

router.get('/:productId', function (req, res, next){
    const productId = req.params.productId;
    const db= database();

    db.query(Sql.get_product_from_productId(productId), (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }

        res.status(200).json(parseProduct(result));
    });

    db.end();
});

router.get('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid '});
});

router.get('/:', function (req, res, next){

});

module.exports = router;
