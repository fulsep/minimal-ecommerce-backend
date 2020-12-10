/* eslint-disable require-jsdoc */
const Model = require('./index');

function Addresses() {
  this.table = 'user_addresses';
  // this.column = [];
}

Addresses.prototype = new Model();

module.exports = Addresses;
