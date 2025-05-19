require("dotenv").config();

const express = require('express');
const logger = require("./utils/logger");
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
app.use('/', require('./routes/ping'));
app.use('/ping', require('./routes/ping'));
app.use('/categories', require('./routes/categories'));
app.use('/category', require('./routes/productsFromCategory'));
app.use('/product', require('./routes/product'));
app.use('/cart', require('./routes/cart'));
app.use('/similarProducts', require('./routes/similarProducts'));
app.use('/addNewProductToDatabase', require('./routes/addNewProductToDatabase'));
app.use('/getAuthToken', require('./routes/getAuthToken'));
app.use('/login', require('./routes/login'));
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
