class Sql {
    get_all_categories(){
        return "Select * from categories;";
    };
    get_products_from_category(category){
        const query = "Select * from products where category=\'" + category + "\';";
        console.log("Preparing SQL Query: " + query);
        return query;
    }

    get_all_products_from_ids(ids){
        let product_ids_str = '';
        ids.forEach(id => product_ids_str = product_ids_str + id.toString() + ',');
        product_ids_str = product_ids_str.substring(0, product_ids_str.length - 1);
        const query = `Select * from products where id in (${product_ids_str})`;
        console.log("Preparing SQL Query : " + query);
        return query;
    }
}
module.exports = new Sql();