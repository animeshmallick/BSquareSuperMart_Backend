const database = require('../internal/database.js');
const SimilarProductsHelper = require('../helpers/similarProductsHelper.js');
const Sql = require('../resource/sql.js');
const express = require('express');

const router = express.Router();
router.get('/:productId', function (req, res, next) {
    const productId = Number(req.params.productId);

    database.query(Sql.get_all_products())
        .then(sql_response => {
            const result = SimilarProductsHelper.getSimilarProducts(sql_response, productId);
            if(result.hasOwnProperty('error'))
                return res.status(400).json({error: result.error});

            const parsedResult = SimilarProductsHelper.parseSimilarProducts(result);
            res.status(200).json(parsedResult);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
module.exports = router;