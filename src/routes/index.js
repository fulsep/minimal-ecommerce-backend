const productRouter = require('./products');

const app = (app, prefix) => {
  app.use(prefix.concat('/products'), productRouter);
};

module.exports = app;
