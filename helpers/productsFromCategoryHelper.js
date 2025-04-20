module.exports = function parseProductsPerCategoryResults(result){
    const products = {};
    result.forEach(product => {
        const subcategory = product.subcategory;
        // Only pick specific fields
        const cleanedProduct = {
            name: product.name,
            size: product.size,
            price: product.selling_price,
            oldPrice: product.mrp,
            imgSrc: product.image_url
        };

        if(!products[subcategory]){
            products[subcategory] = [cleanedProduct];
        }else{
            products[subcategory].push(cleanedProduct);
        }

    });

    return products;
}
