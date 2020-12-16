const { Op } = require('sequelize');
const qs = require('querystring');
const { response } = require('../helpers');
const { Invoice, InvoiceItem } = require('../models/index');

const { DATA_PAGE, DATA_LIMIT, DATA_SEARCH } = process.env;

exports.list = async (req, res) => {
  const { id: userId } = req.authUser;
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
  const data = await Invoice.findAndCountAll({
    offset: (page * limit) - limit,
    limit,
    where: {
      // name: {
      //   [Op.like]: `%${search}%`,
      // },
      userId,
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
  return response(res, 'List of Invoice', { results, pageInfo });
};

exports.detail = async (req, res) => {
  const { id } = req.matchedData;
  const { id: userId } = req.authUser;
  const results = await Invoice.findOne({
    where: { id, userId },
    include: [
      {
        model: InvoiceItem,
        as: 'products',
      },
    ],
  });
  if (results) {
    return response(res, 'Detail Invoice', { results });
  }
  return response(res, 'Data not found', {}, 404);
};
