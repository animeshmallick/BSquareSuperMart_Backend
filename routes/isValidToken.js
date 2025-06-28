const express = require('express');
const router = express.Router();
const token = require('../internal/token');

router.post('/', token.verifyAuthToken, (req, res, next) => {
    res.status(200).json({is_valid_user: true});
});
module.exports = router;