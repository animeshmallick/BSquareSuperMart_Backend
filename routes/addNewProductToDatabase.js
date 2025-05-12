const database = require('../internal/database.js');
const Sql = require('../internal/sql.js');
const express = require('express');
const multer = require('multer');
const helper = require('../helpers/addNewProductToDatabaseHelper.js');

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();
router.post('/', upload.array('images', 10), async function (req, res, next) {
    const product = req.body;
    const imageFiles = req.files;
    const imageUrls = [];
    const db = database();
    if (!imageFiles || imageFiles.length < 3){
        res.status(400).json({message: "Required At least 3 images"});
        return;
    }
    // Check if product is already [resent in DB
    db.query(Sql.check_product_in_database(product), async function (err, result) {
        if (err) {
            res.status(500).json({message: 'Something went wrong. Failed to add new product.'});
            return;
        }
        // If product is not already in DB and should be added.
        if (result[0]['length'] === 0) {
            // Upload Images to S3 bucket
            for (const file of imageFiles) {
                const imageKey = await helper.uploadImageToS3(file, product.name);
                imageUrls.push(imageKey);
            }
            product.imageUrls = imageUrls.join("&&");
            // Add product to DB
            db.query(Sql.add_new_product_to_db(product), function (err, result) {
                if (err) {
                    res.status(500).json({message: 'Something went wrong.'});
                    return;
                }
                res.status(200).json({message: 'Product Added Successfully'});
            });
        } else {
            res.status(400).json({message: 'Product already exists in Database'});
        }
    })
});
module.exports = router;
