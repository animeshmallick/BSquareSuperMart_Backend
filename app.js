require("dotenv").config();

const express = require('express');
const logger = require('./utils/logger');
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const categories = require('./routes/categories');
const cart = require('./routes/cart.js');
const category=require('./routes/productsFromCategory');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const app = express();
setup_router();

logger.info('Server Started at port : ' + process.env.PORT || '3000')

// Add Backend Routers
app.use('/categories', categories);
app.use('/category', category);
app.use('/cart', cart);


// Initial Router Setup
function setup_router(){
    app.use(cors());
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
}

module.exports = app;