const Users = require('../models/users');
const profile = new Users();
const multer = require('multer');
const upload = require('../helpers/upload');
const avatarUpload = upload.single('avatar');

module.exports = {
  get: (req, res)=> {
    const {id} = req.authUser;
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
    const {id} = req.authUser;
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
  changeAvatar: (req, res)=> {
    const {id} = req.authUser;
    const error = ()=> {
      return res.status(500).send({
        success: false,
        message: 'Error occurred when uploading file',
      });
    };
    avatarUpload(req, res, (err)=>{
      if (err instanceof multer.MulterError) {
        return error();
      } else if (err) {
        return error();
      }
      profile.update({where: {id}}, {avatar: req.file.path}, (err, result)=>{
        return res.send({
          success: true,
          message: 'Your avatar changed!',
        });
      });
    });
  },
};
