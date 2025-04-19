class Sql {
    get_all_categories(){
        return "Select * from categories;";
    };
    get_products_from_category(category){
        const query = "Select * from products where category=\'" + category + "\';";
        return query;
    }
}

module.exports = new Sql();