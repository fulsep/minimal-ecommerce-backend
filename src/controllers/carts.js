const { Op, Sequelize } = require('sequelize');
const qs = require('querystring');
const { response } = require('../helpers');
const { Product, Cart } = require('../models/index');

const { DATA_PAGE, DATA_LIMIT, DATA_SEARCH } = process.env;

exports.list = async (req, res) => {
  if (!req.matchedData.page) {
    req.matchedData.page = Number(DATA_PAGE);
  }
  if (!req.matchedData.limit) {
    req.matchedData.limit = Number(DATA_LIMIT);
  }
  if (!req.matchedData.search) {
    req.matchedData.search = DATA_SEARCH;
  }
  const { page, limit, search } = req.matchedData;
  const data = await Cart.findAndCountAll({
    offset: (page * limit) - limit,
    limit,
    include: [
      {
        model: Product,
        as: 'product',
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      },
    ],
  });
  const { rows: results, count } = data;
  const totalPage = Math.ceil(count / limit);
  const pageInfo = {
    total: count,
    perPage: limit,
    currentPage: page,
    totalPage,
    nextLink: page < totalPage ? `?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}` : null,
    prevLink: page > 1 && page < totalPage ? `?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}` : null,
  };
  return response(res, 'List of Products on Cart', { results, pageInfo });
};

exports.addToCart = async (req, res) => {
  const { id } = req.matchedData;
  const results = await Product.findOne({ where: { id } });
  if (results) {
    const existing = await Cart.findOne({ where: { productId: results.id } });
    let final = '';
    if (existing) {
      final = await existing.update({ amount: existing.amount + 1 });
    } else {
      final = await Cart.create({ amount: 1, productId: results.id });
    }
    return response(res, 'Add Product', { results: final });
  }
  return response(res, 'Data not found', {}, 404);
};
