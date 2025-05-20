const express = require('express');
const router = express.Router();
const token = require('../internal/token');

router.post('/', token.verifyAuthToken, (req, res, next) => {
    if(req.hasOwnProperty('customer_id'))
        res.status(200).json({is_valid_user: true});
    else
        res.status(401).json({is_valid_user: false});
});
module.exports = router;