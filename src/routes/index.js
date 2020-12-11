const productRouter = require('./products');
const profileRouter = require('./profile');
const flashsaleRouter = require('./flashsale');
const addressRouter = require('./address');
const authRouter = require('./auth');
const cartRouter = require('./carts');
const checkoutRouter = require('./checkout');
const authMiddleware = require('../middlewares/auth');

const app = (app, prefix) => {
  app.use(prefix, authRouter);
  app.use(prefix.concat('/products'), productRouter);
  app.use(prefix.concat('/flashsale'), flashsaleRouter);
  app.use(prefix.concat('/profile'), authMiddleware.authCheck, profileRouter);
  app.use(prefix.concat('/address'), authMiddleware.authCheck, addressRouter);
  app.use(prefix.concat('/carts'), authMiddleware.authCheck, cartRouter);
  app.use(prefix.concat('/checkout'), authMiddleware.authCheck, checkoutRouter);
};

module.exports = app;
