const database = require('../internal/database.js')
const parseProductsPerCategory = require('../helpers/productsFromCategoryHelper.js');
const Sql = require('../resource/sql.js');
const express = require('express');

const router = express.Router();

router.get('/:category', function (req, res, next){
    const category = req.params.category;
    database.query(Sql.get_products_from_category(category))
        .then(sql_response => {
            res.status(200).json(parseProductsPerCategory(sql_response));
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
module.exports = router;