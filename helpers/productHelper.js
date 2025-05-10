module.exports = function parseProduct(result){
    const productObj = [];
    result.forEach((product) => {
    const cleanedProduct = {
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        productSize: product.size,
        productPrice: product.selling_price,
        productMrp: product.mrp,
        productImg: product.image_url,
        productSku: product.sku,
        productTags: product.tags
        };
    productObj.push(cleanedProduct);
    });
    return productObj;
}