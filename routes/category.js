const database = require('../internal/database.js')
const parseCategories = require('../helpers/categoryHelper.js');
const Sql = require('../internal/sql.js');
const get_products_from_category_query= require('../internal/sql.js');
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
        res.status(200).json(result);
    });
    db.end();
});
module.exports = router;