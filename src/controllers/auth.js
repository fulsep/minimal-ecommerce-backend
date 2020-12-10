const Users = require('../models/users');
const user = new Users();
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');

module.exports = {
  register: (req, res) => {
    const data = {...req.body};
    user.find({where: {email: data.email}}, (err, result)=>{
      if (result.rows.length <1) {
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
        user.create(data, (err, result)=> {
          delete result.rows[0].password;
          return res.send({
            success: false,
            message: 'Register successfully',
            token: jwt.sign(result.rows[0].id),
          });
        });
      } else {
        return res.status(500).send({
          success: false,
          message: 'Email already used',
        });
      }
    });
  },
  login: (req, res)=> {
    const data = {...req.body};
    user.find({where: {email: data.email}}, (err, result)=>{
      if (result.rows.length > 0) {
        const password = bcrypt.compareSync(
            data.password, result.rows[0].password,
        );
        if (password) {
          return res.send({
            success: false,
            message: 'Login successfully',
            token: jwt.sign(result.rows[0].id),
          });
        } else {
          return res.status(500).send({
            success: false,
            message: 'Wrong email or password',
          });
        }
      } else {
        return res.status(500).send({
          success: false,
          message: 'Wrong email or password',
        });
      }
    });
  },
};
