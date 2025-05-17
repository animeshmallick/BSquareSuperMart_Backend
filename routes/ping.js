const express = require('express');
const router = express.Router();
const token = require('../internal/token');

router.get('/', token.verifyAuthToken,
    (req, res) =>{
    const ping = {"message": "Ping From Backend Server", "user": req.customer_id}
    res.status(200).json(ping);
});
router.post('/', function (req, res, next){
    res.status(400).json({"message": "Ping From Backend Server"})
});
module.exports = router;