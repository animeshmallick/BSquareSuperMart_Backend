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
        
        return query;
    }

    get_product_from_productId(productId) {
        const query = `SELECT * FROM products WHERE id = '${productId}';`;
        
        return query;
    }

    get_all_products(){
        const query = `SELECT * FROM products;`;
        
        return query;
    }

    check_product_in_database(product) {
        const query = `SELECT COUNT(*) as 'length' FROM products where name = '${product.name}' and 
                                    category = '${product.category}' and subcategory = '${product.subcategory}' and 
                                    brand = '${product.brand}' and size = '${product.size}'`;
        
        return query;
    }

    add_new_product_to_db(product) {
      const query = `INSERT INTO products (name,category_header,category,subcategory,brand,sku,barcode,mrp,selling_price,stock,size,description,image_url,expiration_date,tags)
                            VALUES ('${product.name}','${product.category_header}','${product.category}','${product.subcategory}','${product.brand}','${product.sku}','${product.barcode}','${product.mrp}',
                                    '${product.selling_price}','${product.stock}','${product.size}','${product.description}','${product.imageUrls}','${product.expiration_date}','${product.tags}')`;
      
      return query;
    }

    get_user_address(userId){
        const query = `SELECT addr_line1, addr_line2, address_id FROM addresses WHERE userid ='${userId}'`;
        
        return query;
    }
    verify_login_details(phonenumber,password){
        const query =`SELECT * FROM users WHERE phone='${phonenumber}' AND password='${password}'`;
        
        return query;
    }
    insertIntoOrdersTable(){
        const query = "INSERT INTO orders (order_id,product_id,quantity) VALUES ?";
        return query;
    }
    reduceInventory() {
        const query = `UPDATE products SET stock = stock - 1 WHERE id in (?)`;
        return query;
    }
    verify_address_belong_to_user(userId,address){
        const query = `SELECT * FROM addresses WHERE USERID ='${userId}' AND address_id ='${address}'`;
        return query;
    }
    insertIntoPurchaseTable(){
        const query = "INSERT INTO purchase (purchase_id, customer_id, address_id, order_id, status, payment_id) VALUES ?";
        return query;
    }
    get_purchase_details(pid){
        const query = `SELECT * FROM purchase where purchase_id ='${pid}'`;
        return query;
    }
    get_all_purchase(date){
        const query = `SELECT * FROM purchase where purchase_id LIKE 'PID-${date}%-%'`;
        return query;
    }
    get_user_address_query() {
        return "SELECT * FROM addresses WHERE address_id = ?"
    }
    get_user_phoneNumber_query() {
        return "SELECT phone FROM users WHERE userid = ?"
    }
    get_address(addressId){
        return `SELECT * FROM addresses WHERE address_id = '${addressId}'`;
    }
    get_orders(order_ids) {
        const quoted_ids = order_ids.map(id => `'${id}'`);
        const query = `SELECT * FROM orders WHERE order_id IN (${quoted_ids.join(',')})`;
        return query;
    }
    add_new_address(customerId, address){
        const query = `INSERT INTO addresses(USERID,address_id,addr_line1,addr_line2) VALUES ('${customerId}','${address.address_id}','${address.addr_line1}','${address.addr_line2}')`;
        console.log(query);
        return query;
    }
}

module.exports = new Sql();
