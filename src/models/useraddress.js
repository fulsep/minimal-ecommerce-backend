'use strict';
const {
  Model
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
    recipient: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAddress',
  });
  return UserAddress;
};