const Products = require('../models/products');
const product = new Products();

module.exports = {
  list: (req, res)=> {
    product.find({offset: 0}, (err, result)=> {
      if (result) {
        return res.send({
          success: true,
          message: 'List products',
          results: result.rows,
        });
      } else {
        console.log(err);
      }
    });
  },
  detail: (req, res)=> {
    product.find({where: {id: req.params.id}}, (err, result)=> {
      if (result) {
        return res.send({
          success: true,
          message: 'List product',
          results: result.rows,
        });
      } else {
        console.log(err);
      }
    });
  },
  create: (req, res)=> {
    product.create(req.body, (err, results)=> {
      if (results) {
        console.log(results);
        return res.send({
          success: true,
          message: 'Product has been added',
          results: results.rows[0],
        });
      } else {
        return res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    });
  },
  update: (req, res)=> {
    const {id} = req.params;
    product.update({where: {id}}, req.body, (err, result)=> {
      if (result) {
        return res.send({
          success: true,
          message: 'Data updated',
          results: result.rows[0],
        });
      } else {
        return res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    });
  },
  delete: (req, res)=>{
    const {id} = req.params;
    product.delete({where: {id}}, (err, result)=> {
      if (result && result.rows.length > 0) {
        return res.send({
          success: true,
          message: 'Data deleted',
          results: result.rows[0],
        });
      } else {
        if (result.rows.length < 1) {
          return res.status(500).send({
            success: false,
            message: `There is no data with id ${id}`,
          });
        } else {
          return res.status(500).send({
            success: false,
            message: err.message,
          });
        }
      }
    });
  },
};
