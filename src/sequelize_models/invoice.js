/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invoice.init({
    invCode: DataTypes.STRING,
    shippingAddress: DataTypes.TEXT,
    transactionDate: DataTypes.DATE,
    invoiceStatus: DataTypes.ENUM('Unpaid', 'Canceled', 'Success'),
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};
