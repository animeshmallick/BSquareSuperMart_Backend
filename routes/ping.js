const express = require('express');
const router = express.Router();
const token = require('../internal/token');

router.get('/', (req, res) =>{
    res.status(200).json({"message": "Ping From Backend Server"});
});
router.post('/', token.verifyAuthToken, (req, res, next) => {
    res.status(200).json({"message": "Ping From Backend Server", "user": req.customer_id});
});
module.exports = router;