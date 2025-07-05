const database = require('../internal/database.js');
const placeOrderHelper = require('../helpers/placeOrderHelper.js');
const Sql = require('../resource/sql.js');
const express = require('express');
const token = require('../internal/token');
const PurchaseStatus = require("../internal/PurchaseStatus");
const util = require("../utils/utils.js");

const router = express.Router();

router.post('/', token.verifyAuthToken,
    placeOrderHelper.verifyIsNewPurchase, placeOrderHelper.verifyAddressOwnership,
    placeOrderHelper.createOrders, placeOrderHelper.verifyPaymentMethod,
    function (req, res, next){
    try{
        const purchase_doc = {
            customer_id: req.customer_id,
            signed: false,
            timestamp: util.getDateTimeStringFormatted(),
            message: `UserID (${req.customer_id}) Trying to Place Order`,
            purchase_id: req.purchase_id,
            address: req.address,
            payment_method: req.payment_method,
            orders: req.order,
            payment_status: "PENDING",
        };

        database.query(Sql.insertIntoOrdersTable(), [placeOrderHelper.convertOrdersToArray(purchase_doc.orders)])
            .then(result => {
                console.log("Orders Inserted Successfully");
                purchase_doc.message = `Order Placed Successfully`;
                database.query(Sql.reduceInventory(), [placeOrderHelper.convertProductIdToArray(purchase_doc.orders)])
                    .then(result => {
                        purchase_doc.inventory_reduced = true;
                        console.log("Inventory Reduced Successfully");
                        database.query(Sql.insertIntoPurchaseTable(),
                            [[placeOrderHelper.getInsertablePurchaseDoc(purchase_doc)]])
                            .then(result => {
                                purchase_doc.signed = true;
                                purchase_doc.placedAt = util.getDateTimeStringFormatted();
                                purchase_doc.status = PurchaseStatus.PLACED;
                                console.log("Purchase Document Inserted Successfully");
                                res.status(201).json(purchase_doc);
                            })
                            .catch(err => {
                                res.status(500).json({error: err.message});
                            })
                    }).catch(err => {
                        res.status(206).json({status: "Order Placed Successfully, but Inventory Reduction Failed",
                            error: err.message, purchase_doc: purchase_doc});
                    });
            }).catch(err => {
                res.status(500).json({error: err.message});
        });
    }catch (err){
        console.log(err);
        res.status(400).json({error: err.message});
    }
});

module.exports = router;