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
      UserDetail.belongsTo(models.User, { foreignKeyConstraint: 'userId', as: 'user' });
    }
  }
  UserDetail.init({
    avatar: DataTypes.STRING,
    fullName: DataTypes.STRING,
    gender: DataTypes.ENUM('Male', 'Female', 'Others'),
    birthdate: DataTypes.DATEONLY,
    phone: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};
