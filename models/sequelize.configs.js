const { Sequelize } = require('sequelize');
const configs =require('../config')
const sequelize = new Sequelize(
    configs.dbMYSQL.db , configs.dbMYSQL.user , configs.dbMYSQL.password , 
    {
        host : configs.dbMYSQL.host, 
        port : configs.dbMYSQL.port, 
        dialect: configs.dbMYSQL.dialect,
        operatorsAliases: false,
        pool: {
          max: configs.dbMYSQL.pool.max,
          min: configs.dbMYSQL.pool.min,
          acquire: configs.dbMYSQL.pool.acquire,
          idle: configs.dbMYSQL.pool.idle
        }

    }
)
const db = {} 
db.Sequelize = Sequelize
db.sequelize = sequelize 
db.Products = require('../models/product.model')(sequelize, Sequelize);
module.exports = db