const Carts = require('../models/carts');
const cart = new Carts();

module.exports = {
  getList: (req, res)=> {
    const {id: userId} = req.authUser;
    cart.find({where: {userId}}, (err, result)=> {
      if (result) {
        return res.send({
          success: true,
          message: 'List item on cart',
          results: result.rows,
        });
      } else {
        return res.status(500).send({
          success: false,
          message: (err && err.message) || 'There is an error',
        });
      }
    });
  },
  directAddItem: (req, res)=> {
    const {id: userId} = req.authUser;
    const {id: productId} = req.params;
    cart.find({where: {userId, productId}}, (err, onCart)=> {
      if (onCart) {
        if (onCart.rows.length< 1) {
          cart.create({userId, productId, quantity: 1}, (err, result)=> {
            return res.send({
              success: true,
              message: 'Product added to cart',
              results: result.rows[0],
            });
          });
        } else {
          const quantity = onCart.rows[0].quantity+1;
          cart.update({
            where: {userId, productId},
          }, {quantity}, (err, result)=> {
            return res.send({
              success: true,
              message: 'Product added to cart',
              results: result.rows[0],
            });
          });
        }
      } else {
        return res.status(500).send({
          success: false,
          message: (err && err.message) || 'There is an error',
        });
      }
    });
  },
};
