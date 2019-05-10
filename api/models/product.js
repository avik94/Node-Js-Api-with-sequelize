const Sequelize = require('sequelize');
const sequelize = require('../../connection');

const Product = sequelize.define('product', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Product;