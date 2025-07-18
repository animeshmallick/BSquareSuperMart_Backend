const express = require('express');
const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const token = require('../internal/token');
const helper = require('../helpers/changePurchaseStatusHelper.js');

const router = express.Router();

router.post('/:pid/:status', token.verifyAdminAuthToken, (req, res) => {
    console.log("Change Purchase Status Requested");
    const adminUserId = req.admin_user_id;
    const pid = req.params.pid;
    const status = req.params.status;
    console.log(`PID [${pid}] -> Status Change Requested by [${adminUserId}] to [${status}]`);
    database.query(Sql.get_purchase_status(pid))
        .then(result => {
            if (result.length === 1){
                const oldStatus = result[0].status;
                if(helper.isStatusChangeAllowed(oldStatus, status)){
                    database.query(Sql.change_purchase_status(pid, status))
                        .then(result => {
                            console.log(`PID [${pid}] -> Status Change Success [${oldStatus}] to [${status}]`);
                            res.status(200).json({success: `Status Change Success from [${oldStatus}] to [${status}]`});
                        })
                }else{
                    console.log(`PID [${pid}] -> Status Change Not Allowed from [${oldStatus}] to [${status}]`);
                    res.status(400).json({error: `Status Change Not Allowed from [${oldStatus}] to [${status}]`});
                }
            }else{
                res.status(404).body({error: "Invalid Purchase Id"});
            }
        })
});
module.exports = router;