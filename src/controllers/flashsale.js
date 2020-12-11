const Flashsale = require('../models/flashsale');
const flashsale = new Flashsale();

module.exports = {
  list: (req, res)=> {
    flashsale.find({offset: 0}, (err, result)=> {
      if (result) {
        return res.send({
          success: true,
          message: 'List Flashsale',
          results: result.rows,
        });
      } else {
        console.log(err);
      }
    });
  },
  create: (req, res)=> {
    flashsale.create(req.body, (err, results)=> {
      if (results) {
        console.log(results);
        return res.send({
          success: true,
          message: 'Flashsale has been added',
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
    const {flashsaleId} = req.params;
    flashsale.update({where: {id: flashsaleId}}, req.body, (err, result)=> {
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
    const {flashsaleId} = req.params;
    flashsale.delete({where: {id: flashsaleId}}, (err, result)=> {
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
            message: `There is no data with id ${flashsaleId}`,
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
