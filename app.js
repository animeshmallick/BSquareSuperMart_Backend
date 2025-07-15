require("dotenv").config();

const express = require('express');
const logger = require("./src/utils/logger");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const app = express();

// Ensure logs directory exists
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Logging
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
app.use('/', require('./src/routes/ping'));
app.use('/ping', require('./src/routes/ping'));
app.use('/categories', require('./src/routes/categories'));
app.use('/category', require('./src/routes/productsFromCategory'));
app.use('/product', require('./src/routes/product'));
app.use('/cart', require('./src/routes/cart'));
app.use('/similarProducts', require('./src/routes/similarProducts'));
app.use('/addNewProductToDatabase', require('./src/routes/addNewProductToDatabase'));
app.use('/getAuthToken', require('./src/routes/getAuthToken'));
app.use('/login', require('./src/routes/login'));
app.use('/isvalidToken', require('./src/routes/isValidToken'));
app.use('/getAllProducts', require('./src/routes/getAllProducts'));
app.use('/getUserAddresses', require('./src/routes/address'));
app.use('/getPaymentMethod', require('./src/routes/getPaymentMethod'));
app.use('/getPurchaseID', require('./src/routes/getPurchaseID'));
app.use('/placeOrder', require('./src/routes/placeOrder'));
app.use('/adminLogin', require('./src/routes/adminLogin'));
app.use('/getAllPurchase', require('./src/routes/getAllPurchase'));
app.use('/getPurchaseDoc', require('./src/routes/getPurchaseDocument'));
app.use('/addAddress', require('./src/routes/addAddress'));

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({success: false, message: "Endpoint Not Found",});
});

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({success: false, message: err.message || "Internal Server Error",});
});

module.exports = app;
