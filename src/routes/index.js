const productRouter = require('./products');
const profileRouter = require('./profile');
const addressRouter = require('./address');
const authRouter = require('./auth');
const authMiddleware = require('../middlewares/auth');

const app = (app, prefix) => {
  app.use(prefix, authRouter);
  app.use(prefix.concat('/products'), productRouter);
  app.use(prefix.concat('/profile'), authMiddleware.authCheck, profileRouter);
  app.use(prefix.concat('/address'), authMiddleware.authCheck, addressRouter);
};

module.exports = app;
