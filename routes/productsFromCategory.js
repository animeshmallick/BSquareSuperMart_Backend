const database = require('../internal/database.js')
const parseProductsPerCategory = require('../helpers/productsFromCategoryHelper.js');
const Sql = require('../internal/sql.js');
const express = require('express');

const router = express.Router();

router.get('/:category', function (req, res, next){
    const category=req.params.category;
    const db= database();
    db.query(Sql.get_products_from_category(category), (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(parseProductsPerCategory(result));
    });
    db.end();
});

router.get('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid Category'});
});

router.post('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid Router'})
});

module.exports = router;