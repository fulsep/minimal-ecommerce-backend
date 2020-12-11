/* eslint-disable require-jsdoc */
const Model = require('./index');

function FLashsale() {
  this.table = 'flash_sale';
  // this.column = [];
}

FLashsale.prototype = new Model();

module.exports = FLashsale;
