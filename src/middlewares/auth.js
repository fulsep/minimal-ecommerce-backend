const jwt = require('../helpers/jwt');

module.exports = {
  authCheck: (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      const rawToken = req.headers.authorization.substr(7);
      const authUser = jwt.check(rawToken);
      if (authUser) {
        req.authUser = authUser;
        next();
      } else {
        res.status(401).send({
          success: false,
          message: 'Unauthorized',
        });
      }
    } else {
      res.status(401).send({
        success: false,
        message: 'Unauthorized',
      });
    }
  },
};
