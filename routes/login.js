const database = require('../internal/database.js');
const Token = require('../internal/token.js');
const Sql = require('../internal/sql.js');
const express = require('express');

const router = express.Router();

router.post('/', function (req, res, next) {
    const loginDetails = req.body;
    let authToken ="";
    const db = database();
    db.query(Sql.verify_login_details(BigInt(loginDetails.phone), loginDetails.password), function (err, result) {
        db.end();
        if (err) {
            res.status(500).json({error: err.message});
        }
        if (result.length === 1 && result[0].userid != null){
            authToken = Token.getToken(result[0].userid);
            console.log(result[0].userid);
            res.status(200).json({authToken: authToken})
        }else{
            res.status(401).json({error: "No User Details Found"});
        }
    });

});
module.exports = router;