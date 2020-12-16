const authRouter = require('./auth');
const productRouter = require('./products');
const invoiceRouter = require('./invoices');
const cartRouter = require('./carts');
const checkoutRouter = require('./checkout');
const addressRouter = require('./addresses');

const app = (router, prefix) => {
  router.use(prefix, authRouter);
  router.use(prefix, productRouter);
  router.use(prefix, cartRouter);
  router.use(prefix, checkoutRouter);
  router.use(prefix, addressRouter);
  router.use(prefix, invoiceRouter);
};

module.exports = app;
