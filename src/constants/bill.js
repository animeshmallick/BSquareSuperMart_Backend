const Bill = Object.freeze({
    //All values are in INR
    DELIVERY_FEE: 10,
    MIN_AMOUNT_FOR_FREE_DELIVERY: 200,
    PACKAGING_FEE: 3,
    MIN_AMOUNT_FOR_FREE_PACKAGING: 500,
    PLATFORM_FEE: 2,
    SMALL_CART_FEE: 5,
    MIN_AMOUNT_FOR_BIG_CART: 100,
    RESTRICTED_CART_FEE: 2
});
module.exports = Bill;