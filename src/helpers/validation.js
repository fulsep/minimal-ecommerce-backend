const { validationResult, matchedData } = require('express-validator');
const response = require('./response');

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return response(res, 'Request Error', { errors: err.errors.map((item) => ({ details: item.msg, field: item.param })) });
  }
  req.matchedData = matchedData(req);
  next();
};

module.exports = validate;
