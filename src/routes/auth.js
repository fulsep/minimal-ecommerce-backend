/* eslint-disable new-cap */
const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
// router.post('/forgotPassword', authController.forgotPassword);
// router.post('/forgotPassword/:code', authController.changePassword);

module.exports = router;
