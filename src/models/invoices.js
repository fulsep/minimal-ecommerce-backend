/* eslint-disable require-jsdoc */
const Model = require('./index');

function Invoices() {
  this.table = 'invoices';
  // this.column = [];
}

Invoices.prototype = new Model();

module.exports = Invoices;
