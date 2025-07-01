const database = require('../internal/database.js')
const productHelper = require('../helpers/productHelper.js');
const Sql = require('../resource/sql.js');
const express = require('express');
const logger = require('../utils/logger.js');


const router = express.Router();

//ToDo: differentiate the router for cases '/product/' and '/product/3'

router.get('/:productId', function (req, res, next){
    const productId = req.params.productId;
    database.query(Sql.get_product_from_productId(productId))
        .then(sql_response => {
            if(productHelper.validateProduct(sql_response)){
                res.status(200).json(productHelper.parseProduct(sql_response[0]));
            }else{
                res.status(400).json({error: "Invalid ProductId"});
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

module.exports = router;
