const database = require('../internal/database.js')
const CategoryHelper = require('../helpers/categoriesHelper.js');
const Sql = require('../internal/sql.js');
const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next){
    const db = database();
    db.query(Sql.get_all_products(), (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(CategoryHelper.parseCategoryResult(result));
    });
    db.end();
});
router.post('/', function (req, res, next){
    res.status(400).json({'error': 'Invalid Router'})
});
module.exports = router;