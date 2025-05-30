const database = require('../internal/database.js');
const Sql = require('../internal/sql.js');
const express = require('express');
const logger = require('../utils/logger.js');
const AddressHelper = require('../helpers/addressHelper.js'); // <-- import helper
const router = express.Router();

router.get('/:userID', (req, res) => {
    const userID = req.params.userID;
    console.log("GET /user/getUserAddress/:userID route hit");
    console.log("Getting address for user:", userID);

    const db = database();

    db.query(Sql.get_user_address(userID), (err, result) => {
        db.end();

        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const response = AddressHelper.parseUserAddress(result);
        if (response.found) {
            res.status(200).json({ address: response.address });
        } else {
            res.status(404).json({ address: response.address });
        }
    });
});

module.exports = router;
