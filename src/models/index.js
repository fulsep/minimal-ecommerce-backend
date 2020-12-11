/* eslint-disable require-jsdoc */
const db = require('../helpers/dbConnector');
const format = require('pg-format');

function Model() {
  this.table = 'table';
  this.column = [];
  this.db = db;
  this.format = format;
  this.condition = (cond)=> ({
    string: Object.keys(cond.where).map(
        (item)=>`${item}=%L`,
    ).join(' AND '),
    value: Object.values(cond.where),
    limit: cond.limit || 5,
    offset: cond.offset || 0,
    order: cond.order || ['id', 'ASC'],
  });
}

Model.prototype.create = function(data, cb) {
  const column = Object.keys(data);
  const value = [Object.values(data)];
  const baseQuery = format(
      `
      INSERT INTO ${this.table} (%s) VALUES %L RETURNING *
      `,
      column,
      value,
  );
  console.log(baseQuery);
  db.query(baseQuery, cb);
};

Model.prototype.find = function(cond, cb) {
  if (!cond.where) {
    cond.where = {
      ['1']: 1,
    };
  }
  const condition = this.condition(cond);
  const baseQuery = format(
      `
      SELECT * FROM ${this.table} WHERE ${condition.string}
      ORDER BY %I %s
      LIMIT %L OFFSET %L
      `,
      ...condition.value, ...condition.order, condition.limit, condition.offset,
  );
  console.log(baseQuery);
  db.query(format(baseQuery, condition.value), cb);
};

Model.prototype.update = function(cond, data, cb) {
  if (!cond.where) {
    throw new Error('condition is mandatory');
  }
  const condition = this.condition(cond);
  const escaped = Object.keys(data).map((item)=>`${item}=%L`);
  const value = Object.values(data);
  const baseQuery = format(
      `
      UPDATE ${this.table}
      SET ${escaped.join(', ')}
      WHERE ${condition.string}
      RETURNING *
      `,
      ...value, ...condition.value,
  );
  console.log(baseQuery);
  db.query(format(baseQuery, condition.value), cb);
};

Model.prototype.delete = function(cond, cb) {
  if (!cond.where) {
    throw new Error('condition is mandatory');
  }
  const condition = this.condition(cond);
  const baseQuery = format(
      `
      DELETE FROM ${this.table} WHERE ${condition.string} RETURNING *
      `,
      ...condition.value,
  );
  console.log(baseQuery);
  db.query(format(baseQuery, condition.value), cb);
};

module.exports = Model;
