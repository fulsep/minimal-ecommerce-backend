const {
  Op, literal,
} = require('sequelize');
const { response } = require('../helpers');
const { Product, Cart } = require('../models/index');
const db = require('../models/index');

exports.preview = async (req, res) => {
  const results = await Cart.findAll({
    attributes: {
      include: [
        [literal('("Cart".amount * "product".price)'), 'subtotal'],
      ],
      exclude: ['productId', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Product,
        as: 'product',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    ],
  });
  if (results) {
    const sum = await db.sequelize.query('SELECT SUM(p.price * c.amount) as total FROM "Products" p, "Carts" c');
    let { total } = sum[0][0];
    total = Number(total);
    return response(res, 'Detail Product', { results: { cart: results, total } });
  }
  return response(res, 'Data not found', {}, 404);
};

exports.confirm = async (req, res) => {
  const { id = [] } = req.matchedData;
  const where = {};
  if (id.length) {
    where.id = {
      [Op.in]: id,
    };
  }
  const builder = (list) => `
  INSERT INTO "InvoiceItems" (name, price, amount, "invoiceId", "createdAt", "updatedAt")
  SELECT p.name as name, p.price as price, c.amount as amount, 1, '${new Date().toISOString()}', '${new Date().toISOString()}'
  FROM "Products" p, "Carts" c ${list.length > 0 ? `WHERE c.id IN (${list.map((item) => `'${item}'`).join()})` : ''}`;
  const results = await db.sequelize.query(builder(id));
  if (results) {
    return response(res, 'Invoice generated', { results });
  }
  return response(res, 'Data not found', {}, 404);
};
