
const database = require('../internal/database.js');
const SimilarProductsHelper = require('../helpers/similarProductsHelper.js');
const Sql = require('../internal/sql.js');
const express = require('express');

const router = express.Router();
router.get('/:productId', function (req, res, next) {
    const productId = Number(req.params.productId);
    const db = database();

    db.query(Sql.get_all_products(), (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(SimilarProductsHelper.parseSimilarProducts(SimilarProductsHelper.getSimilarProducts(result, productId)));
    });
    db.end();

});

module.exports = router;