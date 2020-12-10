const Users = require('../models/users');
const profile = new Users();

module.exports = {
  get: (req, res)=> {
    // const {id} = req.authUser
    const id = 1;
    profile.find({where: {id}}, (err, result)=> {
      if (result) {
        delete result.rows[0].password;
        return res.send({
          success: true,
          message: 'Profile',
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
  update: (req, res)=> {
    // const {id} = req.authUser
    const id = 1;
    profile.update({where: {id}}, req.body, (err, result)=>{
      if (result) {
        delete result.rows[0].password;
        return res.send({
          success: true,
          message: 'Profile updated',
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
};
