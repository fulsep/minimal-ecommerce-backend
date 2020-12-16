const { Op } = require('sequelize');
const qs = require('querystring');
const { response } = require('../helpers');
const { Product } = require('../models/index');

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
  const data = await Product.findAndCountAll({
    offset: (page * limit) - limit,
    limit,
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
    },
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
  return response(res, 'List of Products', { results, pageInfo });
};

exports.detail = async (req, res) => {
  const { id } = req.matchedData;
  const results = await Product.findOne({ where: { id } });
  if (results) {
    return response(res, 'Detail Product', { results });
  }
  return response(res, 'Data not found', {}, 404);
};
