const InvalidCartError = require("../exception/InvalidCartError");
class CartHelper {
    parseCartResult(result, product_map) {
        result.forEach(product => product['quantity'] = product_map[product.id])
        return result;
    }

    getProductMap(cart) {
        if(cart.length === 0)
            throw new InvalidCartError("Empty Cart", 404);
        if(this.is_valid_cart_request(cart)) {
            let product_map = {};
            cart.forEach(item => product_map[item.ProductID] = item.Quantity);
            return product_map;
        }else{
            throw new InvalidCartError("Invalid Data in Cart Requests", 401)
        }
    }
    is_valid_cart_request(cart){
        for (let i = 0; i < cart.length; i++){
            if (!cart[i].hasOwnProperty('ProductID') || !cart[i].hasOwnProperty('Quantity'))
                return false;
        }
        return true;
    }
}
module.exports = new CartHelper();