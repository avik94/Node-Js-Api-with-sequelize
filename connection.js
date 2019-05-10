const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_api', 'root', '', {
    host : 'localhost',
    dialect : 'mysql' 
})


module.exports = sequelize;