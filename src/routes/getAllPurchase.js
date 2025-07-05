const database = require('../internal/database');
const Sql = require('../resource/sql');
const express = require('express');
const utils = require('../utils/utils');
const Token = require('../internal/token');
const getAllPurchaseHelper = require("../helpers/getAllPurchase");

const router = express.Router();

router.get("/:date", Token.verifyAdminAuthToken, function (req, res, next) {
    console.log("Getting All Purchase for the date : "+req.params.date);
    const date = req.params.date;
    database.query(Sql.get_all_purchase(date))
        .then(async sql_response => {
            const response = await getAllPurchaseHelper.createPurchaseWrapper(sql_response);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
router.get("/", Token.verifyAdminAuthToken, function (req, res, next) {
    console.log("Getting All Purchase for the Today's date");
    const date = utils.getDateString();
    database.query(Sql.get_all_purchase(date))
        .then(async sql_response => {
            const response = await getAllPurchaseHelper.createPurchaseWrapper(sql_response);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
})
module.exports = router;
