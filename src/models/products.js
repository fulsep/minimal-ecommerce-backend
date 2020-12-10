/* eslint-disable require-jsdoc */
const Model = require('./index');

function Products() {
  this.table = 'products';
  // this.column = ['name', 'price', 'quantity'];
}

Products.prototype = new Model();

module.exports = Products;
