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
      Invoice.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId', as: 'products' });
    }
  }
  Invoice.init({
    invCode: DataTypes.STRING,
    recipient: DataTypes.STRING,
    recipientPhone: DataTypes.STRING,
    shippingAddress: DataTypes.TEXT,
    invoiceStatus: DataTypes.ENUM('Unpaid', 'Canceled', 'Complete'),
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};
