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
}

module.exports = new Sql();
