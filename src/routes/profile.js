/* eslint-disable new-cap */
const router = require('express').Router();

const profileController = require('../controllers/profile');

router.get('/', profileController.get);

module.exports = router;
