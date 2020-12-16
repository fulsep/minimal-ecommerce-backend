const jwt = require('../helpers/jwt');

module.exports = {
  authCheck: (req, res, next) => {
    if (
      req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')
    ) {
      const rawToken = req.headers.authorization.substr(7);
      try {
        const authUser = jwt.check(rawToken);
        if (authUser) {
          req.authUser = authUser;
          return next();
        }
        return res.status(401).send({
          success: false,
          message: 'Unauthorized',
        });
      } catch (e) {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized',
        });
      }
    }
    return res.status(401).send({
      success: false,
      message: 'Unauthorized',
    });
  },
};
