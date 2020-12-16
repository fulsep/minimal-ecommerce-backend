const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ResetRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResetRequest.init({
    code: DataTypes.STRING,
    requestTime: DataTypes.DATE,
    isExpired: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ResetRequest',
  });
  return ResetRequest;
};
