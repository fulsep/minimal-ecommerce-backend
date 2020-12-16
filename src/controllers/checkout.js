const {
  Op, literal,
} = require('sequelize');
const { v4: uuid } = require('uuid');
const { response } = require('../helpers');
const {
  Product, Cart, Invoice, UserAddress,
} = require('../models/index');
const db = require('../models/index');

exports.preview = async (req, res) => {
  const { id: userId } = req.authUser;
  const results = await Cart.findAll({
    where: {
      userId,
    },
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
  if (results && results.length > 0) {
    const sum = await db.sequelize.query(`SELECT SUM(p.price * c.amount) as total FROM "Carts" c INNER JOIN "Products" p ON p.id=c."productId" WHERE c."userId"=${userId}`);
    let { total } = sum[0][0];
    total = Number(total);
    return response(res, 'Detail Product', { results: { items: results, total } });
  }
  return response(res, 'There is no product on cart', {}, 400);
};

exports.confirm = async (req, res) => {
  const { id: userId } = req.authUser;
  const { id = [] } = req.matchedData;
  const where = {
    userId,
  };
  if (id.length) {
    where.id = {
      [Op.in]: id,
    };
  }
  const onCart = await Cart.findAndCountAll({
    where,
  });
  if (onCart.count > 0) {
    const address = await UserAddress.findOne({ where: { userId, isPrimary: true } });
    if (address) {
      const invCode = uuid();
      const sum = await db.sequelize.query(`SELECT SUM(p.price * c.amount) as total FROM "Carts" c INNER JOIN "Products" p ON p.id=c."productId" ${id.length > 0 ? `WHERE c.id IN (${id.map((item) => `'${item}'`).join()}) AND c."userId"=${userId}` : `WHERE c."userId"=${userId}`}`);
      const { total } = sum[0][0];
      const invoiceGenerate = await Invoice.create({
        invCode,
        recipient: address.recipient,
        recipientPhone: address.phone,
        shippingAddress: address.address,
        invoiceStatus: 'Unpaid',
        total,
        userId,
      });
      const builder = (list, invoiceId) => `
  INSERT INTO "InvoiceItems" (name, price, amount, "invoiceId", "createdAt", "updatedAt")
  SELECT p.name as name, p.price as price, c.amount as amount, ${invoiceId}, '${new Date().toISOString()}', '${new Date().toISOString()}'
  FROM "Carts" c INNER JOIN "Products" p ON c."productId"=p.id ${list.length > 0 ? `WHERE c.id IN (${list.map((item) => `'${item}'`).join()}) AND c."userId"=${userId}` : `WHERE c."userId"=${userId}`}`;
      const results = await db.sequelize.query(builder(id, invoiceGenerate.id));
      if (results) {
        if (id.length > 0) {
          await db.sequelize.query(`DELETE FROM "Carts" c WHERE c.id IN (${id.map((item) => `'${item}'`).join()}) AND c."userId"=${userId}`);
        } else {
          await db.sequelize.query(`DELETE FROM "Carts" c WHERE c."userId"=${userId}`);
        }
        return response(res, 'Invoice generated', { results: { invCode } });
      }
    }
    return response(res, 'Please choose primary address to process invoice', {}, 400);
  }
  return response(res, 'There is no products on cart', {}, 400);
};
