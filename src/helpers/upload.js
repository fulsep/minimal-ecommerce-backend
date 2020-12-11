const multer = require('multer');
const {v4: uuid} = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    const dest = 'uploads';
    console.log(dest);
    cb(null, dest);
  },
  filename: (req, file, cb)=>{
    const name = file.originalname;
    const period = name.lastIndexOf('.');
    const ext = name.substring(period+1);
    const filename = String(uuid()).concat(`.${ext}`);
    cb(null, filename);
  },
});

module.exports = multer({storage});
