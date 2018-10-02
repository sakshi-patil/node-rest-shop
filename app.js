const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://localhost:27017/node-rest-shop',{promiseLibrary: require('bluebird')})
    .then(() => console.log('Mongoose connection successful on mongodb://localhost:27017/node-rest-shop'))
    .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Design","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS"){
        res.Header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});

    }
    next();
});

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);


app.use((req, res, next) => {
    const error = new Error('not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        },
        msg:'inside error handler'
    });
});

module.exports = app;