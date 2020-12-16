const { Op } = require('sequelize');
const qs = require('querystring');
const { response } = require('../helpers');
const { UserAddress } = require('../models/index');

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
  const data = await UserAddress.findAndCountAll({
    offset: (page * limit) - limit,
    limit,
    where: {
      name: {
        [Op.like]: `%${search}%`,
      },
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
  return response(res, 'List of Addresses', { results, pageInfo });
};

exports.detail = async (req, res) => {
  const { id: userId } = req.authUser;
  const { id } = req.matchedData;
  const results = await UserAddress.findOne({ where: { id, userId } });
  if (results) {
    return response(res, 'Detail Address', { results });
  }
  return response(res, 'Data not found', {}, 404);
};

exports.create = async (req, res) => {
  const { id: userId } = req.authUser;
  req.matchedData.userId = userId;
  const currentPrimary = await UserAddress.findOne({ where: { userId, isPrimary: true } });
  if (currentPrimary) {
    await currentPrimary.update({ isPrimary: false });
  }
  const results = await UserAddress.create(req.matchedData);
  if (results) {
    return response(res, 'New address added', { results });
  }
  return response(res, 'Failed to create address', {}, 500);
};

exports.setPrimary = async (req, res) => {
  const { id: userId } = req.authUser;
  const { id } = req.matchedData;
  const address = await UserAddress.findOne({ where: { userId, id } });
  if (address) {
    const currentPrimary = await UserAddress.findOne({ where: { userId, isPrimary: true } });
    if (currentPrimary) {
      await currentPrimary.update({ isPrimary: false });
    }
    address.update({ isPrimary: true });
    return response(res, 'Address set to primary', { results: address });
  }
  return response(res, 'Failed to set primary address', {}, 400);
};

exports.edit = async (req, res) => {
  const { id: userId } = req.authUser;
  const { id } = req.matchedData;
  const currentPrimary = await UserAddress.findOne({ where: { userId, isPrimary: true } });
  if (currentPrimary && (currentPrimary.id !== id)) {
    await currentPrimary.update({ isPrimary: false });
  } else if (currentPrimary === null) {
    const selected = await UserAddress.findOne({ where: { userId, id } });
    if (selected) {
      await selected.update({ isPrimary: true });
    }
    return response(res, 'Selected address has set to primary (by default)', {});
  } else {
    return response(res, 'At least one address is primary', {}, 400);
  }
  const address = await UserAddress.findOne({ where: { id, userId } });
  if (address) {
    const results = await address.update(req.matchedData);
    return response(res, 'Edit address successfully', { results });
  }
  return response(res, 'Failed to edit address', {}, 500);
};

exports.delete = async (req, res) => {
  const { id: userId } = req.authUser;
  const { id } = req.matchedData;
  const data = await UserAddress.findOne({ where: { userId, id } });
  if (data) {
    if (data.isPrimary) {
      return response(res, 'Cannot delete primary address', {}, 400);
    }
    data.destroy();
    return response(res, 'Address deleted', { data });
  }
  return response(res, 'Failed to delete address', {}, 400);
};
