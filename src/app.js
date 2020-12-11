const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const {APP_PORT} = process.env;
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));

const uploadDirectory = __dirname.concat('/../uploads');
app.use('/uploads', express.static(uploadDirectory));

// Router import
const router = require('./routes');
router(app, '/api/v1');

app.get('/', (req, res)=> {
  return res.status(200).send({
    success: true,
    message: 'Backend is running well',
  });
});

app.get('*', (req, res)=>{
  return res.status(404).send({
    success: false,
    message: 'Resource not found',
  });
});

app.listen(APP_PORT, ()=> {
  console.log(`App listening on port ${APP_PORT}`);
});
