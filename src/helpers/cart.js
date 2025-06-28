const InvalidCartError = require("../exception/InvalidCartError");
const Bill = require("../constants/bill");
class CartHelper {
    parseCartProducts(result, product_map) {
        result.forEach(product => product['quantity'] = product_map[product.id]);
        return result;
    }

    getProductMap(cart) {
        if(cart.length === 0)
            throw new InvalidCartError("Empty Cart", 404);
        if(this.#is_valid_cart_request(cart)) {
            let product_map = {};
            cart.forEach(item => {
                if(item.Quantity > 0)
                    product_map[item.ProductID] = item.Quantity
            });
            return product_map;
        }else{
            throw new InvalidCartError("Invalid Data in Cart Requests", 403);
        }
    }
    #is_valid_cart_request(cart){
        for (let i = 0; i < cart.length; i++){
            if (!cart[i].hasOwnProperty('ProductID') || !cart[i].hasOwnProperty('Quantity'))
                return false;
        }
        return true;
    }
    getBill(products){
        let cart_items_total = 0;
        let isCartRestricted = false;
        products.forEach(product => {
            cart_items_total += (product.selling_price * product.quantity);
            if (product.hasOwnProperty('isRestricted') && product.isRestricted === true)
                isCartRestricted = true;
        });
        let delivery_fee = cart_items_total < Bill.MIN_AMOUNT_FOR_FREE_DELIVERY ? Bill.DELIVERY_FEE : 0;
        let packaging_fee = cart_items_total < Bill.MIN_AMOUNT_FOR_FREE_PACKAGING ? Bill.PACKAGING_FEE : 0;
        let bill = {
            cart_items_total: cart_items_total,
            delivery_fee: delivery_fee,
            packaging_fee: packaging_fee,
            platform_fee: Bill.PLATFORM_FEE,
        };
        if(cart_items_total < Bill.MIN_AMOUNT_FOR_BIG_CART)
            bill.small_cart_fee = Bill.SMALL_CART_FEE;
        if(isCartRestricted === true)
            bill.restricted_cart_fee = Bill.RESTRICTED_CART_FEE;

        bill.total_bill = Object.values(bill).reduce((sum, value) => sum + value, 0);
        return bill;
    }
    getPurchaseID(){
        const now = new Date();

        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0'); // January is 0
        const yy = String(now.getFullYear()).slice(-2);
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');

        const datetimePart = `${dd}${mm}${yy}${hh}${min}${ss}`;

        const randomSuffix = Math.random().toString(36).substring(2, 10).toUpperCase(); // 4-letter random string

        const pid = `PID-${datetimePart}-${randomSuffix}`;
        console.log(`New PurchaseID Generated: ${pid}`);
        return pid;
    }
}
module.exports = new CartHelper();