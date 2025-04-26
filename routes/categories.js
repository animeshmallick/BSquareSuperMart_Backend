const database = require('../internal/database.js')
const CategoryHelper = require('../helpers/categoryHelper.js');
const Sql = require('../internal/sql.js');
const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next){
    const db = database();
    db.query(Sql.get_all_categories(), (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.status(200).json(parseCategories(result));
    });
    db.end();
});
module.exports = router;