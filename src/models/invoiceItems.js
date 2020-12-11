/* eslint-disable require-jsdoc */
const Model = require('./index');

function InvoiceItems() {
  this.table = 'invoice_items';
  // this.column = [];
}

InvoiceItems.prototype = new Model();

InvoiceItems.prototype.bulkInsert = function(data, cb) {
  const column = Object.keys(data[0]);
  const value = data.map((item)=>[...Object.values(item)]);
  const baseQuery = this.format(
      `
      INSERT INTO ${this.table} (%s) VALUES %L RETURNING *
      `,
      column,
      value,
  );
  console.log(baseQuery);
  this.db.query(baseQuery, cb);
};

module.exports = InvoiceItems;
