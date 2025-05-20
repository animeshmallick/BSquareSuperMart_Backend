class Sql {
    get_all_categories() {
        return "SELECT * FROM categories;";
    }

    get_products_from_category(category) {
        if (typeof category !== 'string') {
            throw new Error('Invalid category');
        }
        const safeCategory = category.replace(/'/g, "''");
        const query = `SELECT * FROM products WHERE category='${safeCategory}';`;
        console.log("Preparing SQL Query: " + query);
        return query;
    }

    get_all_products_from_ids(ids) {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new Error('Invalid ids');
        }
        const numericIds = ids.map(id => {
            if (typeof id !== 'number' && isNaN(Number(id))) {
                throw new Error('Invalid id in list');
            }
            return Number(id);
        });
        const query = `SELECT * FROM products WHERE id IN (${numericIds.join(',')});`;
        console.log("Preparing SQL Query : " + query);
        return query;
    }

    get_product_from_productId(productId) {
        const query = `SELECT * FROM products WHERE id = '${productId}';`;
        console.log("Preparing SQL Query : " + query);
        return query;
    }
    get_all_products(){
        const query = `SELECT * FROM products;`;
        console.log("Preparing SQL Query : " + query);
        return query;
    }
    check_product_in_database(product) {
        const query = `SELECT COUNT(*) as 'length' FROM products where name = '${product.name}' and 
                                    category = '${product.category}' and subcategory = '${product.subcategory}' and 
                                    brand = '${product.brand}' and size = '${product.size}'`;
        console.log("Preparing SQL Query : " + query);
        return query;
    }
    add_new_product_to_db(product) {
      const query = `INSERT INTO products (name,category,subcategory,brand,sku,barcode,mrp,selling_price,stock,size,description,image_url,expiration_date,tags)
                            VALUES ('${product.name}','${product.category}','${product.subcategory}','${product.brand}','${product.sku}','${product.barcode}','${product.mrp}',
                                    '${product.selling_price}','${product.stock}','${product.size}','${product.description}','${product.imageUrls}','${product.expiration_date}','${product.tags}')`;
      console.log("Preparing SQL Query : " + query);
      return query;
    }
    get_user_address(userId){
        const query =`SELECT * FROM users WHERE userid = '${userId}';`;
        console.log("Preparing SQL Query : " + query);
        return query;
    }
    verify_login_details(phonenumber,password){
        const query =`SELECT * FROM users WHERE phonenumber='${phonenumber}' AND password='${password}'`;
        console.log("Preparing SQL Query : " + query);
        return query;
    }
}

module.exports = new Sql();
