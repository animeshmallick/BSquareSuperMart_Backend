const database = require('../internal/database.js');
const Sql = require('../resource/sql.js');
const express = require('express');
const token = require('../internal/token');
const getPurchaseDocHelper = require('../helpers/getPurchaseDocumentHelper.js');
const util = require("../utils/utils");

const router = express.Router();

router.get("/:purchaseID", token.verifyAuthToken, (req, res, next) => {
    const customerId = req.customer_id;
    const purchaseID = req.params.purchaseID;
    let purchase_doc = {
        customer_id: customerId,
        signed: false,
        purchase_id: purchaseID
    };
    database.query(Sql.get_purchase_details(purchaseID))
        .then(async sql_response => {
            if (sql_response.length === 1) {
                const purchase_owner = sql_response[0].customer_id;
                if (purchase_owner === customerId) {
                    purchase_doc.signed = true;

                    purchase_doc.status = sql_response[0].status;
                    purchase_doc.address = sql_response[0].address_id;
                    purchase_doc.orders = sql_response[0].order_id;
                    purchase_doc.payment = sql_response[0].payment_id
                    purchase_doc.purchased_at = sql_response[0].placed_on;

                    purchase_doc.address = await getPurchaseDocHelper.getAddress(purchase_doc.address);
                    purchase_doc.payment = await getPurchaseDocHelper.getPayment(purchase_doc.payment);
                    purchase_doc.orders = await getPurchaseDocHelper.getOrders(purchase_doc.orders);

                    let allProductIds = purchase_doc.orders.map(order => order.product_id);
                    let all_products = await database.query(Sql.get_all_products_from_ids(allProductIds));

                    purchase_doc.orders.forEach(order => {
                        order.product = getPurchaseDocHelper.findProduct(order.product_id, all_products);
                        delete order.product_id;
                    });

                    res.status(200).json(purchase_doc);
                } else {
                    res.status(401).json({error: "Unauthorized Access to Purchase Document. Invalid Ownership.",
                    owner: "aa", customer: customerId, purchase_id: purchaseID});
                }
            } else {
                res.status(400).json({error: "Invalid Purchase ID"});
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});
router.get("/admin/:purchaseID", token.verifyAdminAuthToken, (req, res, next) => {
    const purchaseID = req.params.purchaseID;
    let purchase_doc = {
        signed: false,
        purchase_id: purchaseID
    };
    database.query(Sql.get_purchase_details(purchaseID))
        .then(async sql_response => {
            if (sql_response.length === 1) {
                purchase_doc.customer_id = sql_response[0].customer_id;
                purchase_doc.signed = true;

                purchase_doc.status = sql_response[0].status;
                purchase_doc.address = sql_response[0].address_id;
                purchase_doc.orders = sql_response[0].order_id;
                purchase_doc.payment = sql_response[0].payment_id
                purchase_doc.purchased_at = sql_response[0].placed_on;

                purchase_doc.address = await getPurchaseDocHelper.getAddress(purchase_doc.address);
                purchase_doc.payment = await getPurchaseDocHelper.getPayment(purchase_doc.payment);
                purchase_doc.orders = await getPurchaseDocHelper.getOrders(purchase_doc.orders);

                let allProductIds = purchase_doc.orders.map(order => order.product_id);
                let all_products = await database.query(Sql.get_all_products_from_ids(allProductIds));

                purchase_doc.orders.forEach(order => {
                    order.product = getPurchaseDocHelper.findProduct(order.product_id, all_products);
                    delete order.product_id;
                });

                res.status(200).json(purchase_doc);
            } else {
                res.status(400).json({error: "Invalid Purchase ID"});
            }
        })
        .catch(err => {
            res.status(500).json({error: err.message});
        });
});

module.exports = router;