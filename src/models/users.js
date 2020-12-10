/* eslint-disable require-jsdoc */
const Model = require('./index');

function Users() {
  this.table = 'users';
  // this.column = [];
}

Users.prototype = new Model();

module.exports = Users;
