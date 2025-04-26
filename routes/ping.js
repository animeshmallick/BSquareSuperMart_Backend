const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next){
    const ping = {"message": "Ping From Backend Server"}
    res.status(200).json(ping);
});
router.post('/', function (req, res, next){
    res.status(400).json({"message": "Ping From Backend Server"})
});
module.exports = router;