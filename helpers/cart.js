class CartHelper {
    parseCartResult(result, product_map) {
        result.forEach(product => product['quantity'] = product_map[product.id])
        return result;
    }

    getProductMap(cart){
        let product_map = {};
        cart.forEach(product_wrapper => product_map[product_wrapper.product_id] = product_wrapper.quantity);
        return product_map;
    }
}
module.exports = new CartHelper();