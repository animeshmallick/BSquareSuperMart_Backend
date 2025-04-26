class CategoryHelper {
    parseCategoryResult(result) {
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
}
module.exports = new CategoryHelper();