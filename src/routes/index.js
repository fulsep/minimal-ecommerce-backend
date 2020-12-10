const productRouter = require('./products');
const profileRouter = require('./profile');
const authRouter = require('./auth');
const authMiddleware = require('../middlewares/auth');

const app = (app, prefix) => {
  app.use(prefix, authRouter);
  app.use(prefix.concat('/products'), productRouter);
  app.use(prefix.concat('/profile'), authMiddleware.authCheck, profileRouter);
};

module.exports = app;
