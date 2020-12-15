/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserAddress.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    isPrimary: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'UserAddress',
  });
  return UserAddress;
};
