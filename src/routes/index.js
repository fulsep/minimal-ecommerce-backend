const authRouter = require('./auth');
const productRouter = require('./products');
const cartRouter = require('./carts');
const checkoutRouter = require('./checkout');

const app = (router, prefix) => {
  router.use(prefix, authRouter);
  router.use(prefix, productRouter);
  router.use(prefix, cartRouter);
  router.use(prefix, checkoutRouter);
};

module.exports = app;
