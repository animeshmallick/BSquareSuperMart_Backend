const database = require('../internal/database');
const Sql = require('../resource/sql');
const express = require('express');
const GetAllProductsHelper = require("../helpers/getAllProducts");

const router = express.Router();

router.get("/", function (req, res, next) {
    database.query(Sql.get_all_products())
        .then(sql_response =>{
            res.status(200).json(GetAllProductsHelper.parseResultForBetterSearch(sql_response));
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
module.exports = router;
