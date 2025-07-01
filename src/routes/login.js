const database = require('../internal/database.js');
const Token = require('../internal/token.js');
const Sql = require('../resource/sql.js');
const express = require('express');

const router = express.Router();

router.post('/', function (req, res, next) {
    const loginDetails = req.body;
    if (!loginDetails.hasOwnProperty('phone') || !loginDetails.hasOwnProperty('password'))
        return res.status(400).json({error: "Invalid Login Details"});
    let authToken = "";
    console.log(`Getting Auth Token for Phone : ${loginDetails.phone}`);
    database.query(Sql.verify_login_details(BigInt(loginDetails.phone), loginDetails.password))
        .then(sql_response => {
            if (sql_response.length === 1 && sql_response[0].userid != null){
                authToken = Token.getToken(sql_response[0].userid);
                console.log(`Auth Token Generated for Phone : ${loginDetails.phone}`);
                res.status(200).json({authToken: authToken})
            }else{
                res.status(401).json({error: `No User Details Found for phone ${loginDetails.phone} and password ${loginDetails.password}`});
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
module.exports = router;