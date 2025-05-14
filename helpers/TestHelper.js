const util = require("util");
const Sql = require("../internal/sql.js");
class TestHelper {
    mock_data_key = Object.freeze({
        CATEGORIES: {name: 'categories.json', sql_query: Sql.get_all_categories()},
        CART_WITH_PRODUCTS_1: {name: 'cart_with_1_products.json', sql_query: Sql.get_all_products_from_ids([1])},
        CART_WITH_PRODUCTS_2: {name: 'cart_with_2_products.json', sql_query: Sql.get_all_products_from_ids([1,2])},
        PING: {name: 'ping.json'},
        PRODUCTS_FROM_CATEGORY: {name: 'productsFromCategory.json', sql_query: Sql.get_products_from_category('Dairy')},
        PRODUCTS_WHEN_CATEGORY_INVALID: {name: 'emptyProductsFromCategory.json', sql_query: Sql.get_products_from_category('Invalid')},
        PRODUCT: {name: 'product.json', sql_query:Sql.get_product_from_productId(3)},
        INVALID_PRODUCT: {name: 'emptyProduct.json', sql_query:Sql.get_product_from_productId('')},
        SIMILAR_PRODUCTS: {name: 'similarProducts.json', sql_query:Sql.get_all_products()}
    });
    get_mock_data(mock_date_file_name){
        return require(util.format(`../mock_data/${mock_date_file_name}`));
    }
    get_sql_mock_data(sql_mock_data_file_name){
        return require(util.format(`../mock_data/sql_mock_data/${sql_mock_data_file_name}`));
    }
}
module.exports = new TestHelper();