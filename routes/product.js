const database = require('../internal/database.js')
const parseProduct = require('../helpers/productHelper.js');
const Sql = require('../internal/sql.js');
const express = require('express');
const logger = require('../utils/logger.js');


const router = express.Router();

//ToDo: differentiate the router for cases '/product/' and '/product/3'

router.get('/:productId', function (req, res, next){
    const productId = req.params.productId;
    const db= database();
        db.query(Sql.get_product_from_productId(productId), (err, result) => {
            db.end();
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
            res.status(200).json(parseProduct(result));
        });
});

router.get('/', function (req, res, next) {
    logger.info('GET');
    res.status(400).json({error: 'Invalid ProductID'});
})

router.post('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid Router'});
})

module.exports = router;
