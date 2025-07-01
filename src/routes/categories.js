const database = require('../internal/database.js');
const CategoryHelper = require('../helpers/categoriesHelper.js');
const Sql = require('../resource/sql.js');
const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next){
    database.query(Sql.get_all_products())
        .then(result => {
            res.status(200).json(CategoryHelper.parseCategoryResult(result));
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
module.exports = router;