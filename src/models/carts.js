/* eslint-disable require-jsdoc */
const Model = require('./index');

function Carts() {
  this.table = 'carts';
  // this.column = [];
}

Carts.prototype = new Model();

Carts.prototype.findWithSubtotal = function(cond, cb) {
  if (!cond.where) {
    cond.where = {
      ['1']: 1,
    };
  }
  const condition = this.condition(cond);
  const baseQuery = this.format(
      `
      SELECT p.name, p.quantity as available, c.quantity as onCart, p.price,
      (p.price * c.quantity) as subtotal
      FROM carts c
      INNER JOIN products p ON p.id=c.productId
      WHERE ${condition.string};
      `,
      ...condition.value,
  );
  console.log(baseQuery);
  this.db.query(baseQuery, cb);
};

module.exports = Carts;
