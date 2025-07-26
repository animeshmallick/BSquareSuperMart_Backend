const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const token = require('../internal/token');


const router = express.Router();
router.post('/', token.verifyAuthToken, (req, res) => {
    const customerId = req.customer_id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    database.query(Sql.get_user_password(customerId))
    .then(result => {
        if (result && result.length === 1) {
            if(result[0].password === oldPassword && oldPassword !== newPassword){
                database.query(Sql.update_user_password(customerId, newPassword))
                .then(result => {
                    if(result.affectedRows === 1){
                        res.status(200).json({"message": "Password updated successfully."});
                    }
                }).catch(err => {
                    res.status(500).json({err: err.message});
                })
            }else{
                res.status(400).json({"error": "Invalid Details Entered"});
            }
        }
    }).catch(err => {
        res.status(500).json({err: err.message});
    })
})

module.exports = router;