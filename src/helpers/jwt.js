const jwt = require('jsonwebtoken');
const {APP_KEY} = process.env;

module.exports = {
  sign: (id) => {
    return jwt.sign({id}, APP_KEY);
  },
  check: (token) => {
    return jwt.verify(token, APP_KEY);
  },
};
