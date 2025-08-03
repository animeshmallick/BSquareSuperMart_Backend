const database = require("../internal/database");
const Sql = require("../resource/sql");
const InvalidPlaceOrderRequest = require("../exception/InvalidPlaceOrderRequest");
const AddressOwnershipException = require("../exception/AddressOwnershipException");
const cartHelper = require("./cart");
const ProductOutOfStockError = require("../exception/ProductOutOfStockError");
const getPurchaseIdHelper = require("./getPurchaseIdHelper");

class PlaceOrderHelper {
    convertOrdersToArray(orders){
        let arr = [];
        orders.forEach(order => {
            arr.push([order.orderID, order.product_id, order.quantity]);
        });
        return arr;
    }
    convertProductIdToArray(orders){
        let arr = [];
        orders.forEach(order => {
            arr.push(order.product_id);
        });
        return arr;
    }
    async verifyIsNewPurchase(req, res, next) {
        if (!req.body.hasOwnProperty('purchase_id')){
            throw new InvalidPlaceOrderRequest("Purchase ID Not Found", 400);
        }
        const rows = await database.query(Sql.get_purchase_details(req.body.purchase_id));
        if (rows.length === 0) {
            console.log("Unique Purchase ID : VERIFIED");
            req.purchase_id = req.body.purchase_id;
            next();
        }else{
            throw new InvalidPlaceOrderRequest("Purchase ID Already Exists", 400);
        }
    }
    async verifyAddressOwnership(req, res, next) {
        try {
            const rows = await database.query(Sql.verify_address_belong_to_user(req.customer_id, req.body.address));
            if (rows.length === 0) {
                throw new AddressOwnershipException("Address Ownership failed",400);
            }
            req.address = rows[0];
            console.log("Address Ownership Verified");
            next();
        } catch (err) {
            next(err);
        }
    }
    createOrders(req, res, next) {
        if(req.body === undefined || !req.body.hasOwnProperty('cart')) {
            throw new InvalidPlaceOrderRequest("Invalid Place Order Request", 400);
        }else {
            const productMap = cartHelper.getProductMap(req.body.cart);
            database.query(Sql.get_all_products_from_ids(Object.keys(productMap)))
                .then(result => {
                    const orders = [];
                    result.forEach(product => {
                        if(product.quantity < productMap[product.id])
                            throw ProductOutOfStockError(`ProductID (${product.id}) is out of stock`, 405);
                        const oid = getPurchaseIdHelper.getOrderID(req.purchase_id);
                        orders.push({product_id: product.id,
                            quantity: productMap[product.id],
                            orderID: oid});
                        console.log(`Order ID Generated : ${oid}`);
                    });
                    req.order = orders;
                    req.bill = cartHelper.getBill(cartHelper.parseCartProducts(result, productMap));
                    console.log("Cart Parsed and Bill Generated");
                    next();
                })
                .catch(err => {
                    return res.status(400).json({ message: 'Cannot create orders for place order request' });
                });
        }
    }
    verifyPaymentMethod(req, res, next) {
        if(req.body === undefined || !req.body.hasOwnProperty('payment')) {
            throw new InvalidPlaceOrderRequest("Invalid Place Order Request", 400);
        }else {
            req.payment_method = req.body.payment;
            next();
        }
    }
    getInsertablePurchaseDoc(purchase_doc){
        return [purchase_doc.purchase_id, purchase_doc.customer_id, purchase_doc.address.address_id,
            purchase_doc.orders.map(order => order.orderID).join("&&"), purchase_doc.status, purchase_doc.payment_method]
    }
}
module.exports = new PlaceOrderHelper();