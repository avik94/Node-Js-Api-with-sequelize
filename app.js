const express = require('express');
const app = express();
const sequelize = require('./connection');
const Product = require('./api/models/product');
const productRouter = require('./api/router/product');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/product', productRouter);




// model sync() api
app.use('/database', (req,res)=>{
    sequelize.sync();
    res.status(200).json({
        message: "Table Created!"
    })
});

// error handler
app.use((req,res,next) => {
    const err = new Error('Not Found!');
    next(err);
});
app.use((err,req,res,next)=>{
    res.status(404).json({
        message : err.message
    });
});


module.exports = app;