const database = require('../internal/database');
const Sql = require('../internal/sql');
const express = require('express');
const GetAllProductsHelper = require("../helpers/getAllProducts");

const router = express.Router();

router.get("/", function (req, res, next) {
    const db = database();
    db.query(Sql.get_all_products(), (err, result) => {
        if (err)
            return res.status(500).json({error: err.message});

        const parsedResult = GetAllProductsHelper.parseResultForBetterSearch(result);
        res.status(200).json(parsedResult);
    })
});
module.exports = router;
