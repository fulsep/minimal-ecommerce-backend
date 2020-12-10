const Addresses = require('../models/addresses');
const address = new Addresses();

module.exports = {
  getList: (req, res)=> {
    const {id} = req.authUser;
    address.find({where: {userId: id}}, (err, result)=>{
      if (result) {
        return res.send({
          success: true,
          message: 'Address list',
          results: result.rows,
        });
      } else {
        return res.status(500).send({
          success: false,
          message: err.message,
        });
      }
    });
  },
  create: (req, res)=> {
    req.body.userId = req.authUser.id;
    address.create(req.body, (err, results)=> {
      if (results) {
        return res.send({
          success: true,
          message: 'Address added',
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
    const {id: userId} = req.authUser;
    const {id} = req.params;
    product.update({where: {id, userId}}, req.body, (err, result)=> {
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
    const {id: userId} = req.authUser;
    const {id} = req.params;
    product.delete({where: {id, userId}}, (err, result)=> {
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
