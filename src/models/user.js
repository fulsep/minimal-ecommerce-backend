const {
  Model,
} = require('sequelize');
const bcrypt = require('bcrypt');

async function cryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isConfirmed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeUpdate(async (user) => {
    const hash = await cryptPassword(user.password);
    user.password = hash;
  });
  User.beforeCreate(async (user) => {
    const hash = await cryptPassword(user.password);
    user.password = hash;
  });
  return User;
};
