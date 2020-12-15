/* eslint-disable new-cap */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      invCode: {
        type: Sequelize.STRING,
      },
      shippingAddress: {
        type: Sequelize.TEXT,
      },
      transactionDate: {
        type: Sequelize.DATE,
      },
      invoiceStatus: {
        type: Sequelize.ENUM('Unpaid', 'Canceled', 'Success'),
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invoices');
  },
};
