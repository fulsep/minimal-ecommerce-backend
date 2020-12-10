/* eslint-disable require-jsdoc */
const Model = require('./index');

function Products() {
  this.table = 'products';
  // this.column = [];
}

Products.prototype = new Model();

module.exports = Products;
