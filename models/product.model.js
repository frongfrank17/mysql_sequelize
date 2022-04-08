const {DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("TBProduct", {
      PRD_ID: {
        type: Sequelize.STRING , primaryKey: true ,allowNull: false
      },
      PRD_NAME: {
        type: Sequelize.STRING , allowNull: false , length : 30
      },
      PRD_PRICE: {
        type: Sequelize.INTEGER , allowNull: false
      } 
    } );
    return Products ;
  };