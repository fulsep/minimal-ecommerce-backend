/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserDetail.init({
    avatar: DataTypes.STRING,
    fullName: DataTypes.STRING,
    bio: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    gender: DataTypes.ENUM('Male', 'Female', 'Others'),
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};
