class CartHelper {
    parseCartResult(result) {
        return result.reduce((acc, item) => {
            if (!acc[item.category_header]) {
                acc[item.category_header] = [];
            }
            acc[item.category_header].push({
                name: item.category_name,
                image: item.category_image
            });
            return acc;
        }, {});
    }

    getProductMap(cart){
        let product_map = {};
        cart.forEach(product_wrapper => product_map[product_wrapper.product_id] = product_wrapper.quantity);
        return product_map;
    }
}
module.exports = new CartHelper();