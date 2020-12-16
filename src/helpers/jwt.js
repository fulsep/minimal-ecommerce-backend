const jwt = require('jsonwebtoken');

const { APP_KEY } = process.env;

module.exports = {
  sign: (id) => jwt.sign({ id }, APP_KEY),
  check: (token) => jwt.verify(token, APP_KEY),
};
