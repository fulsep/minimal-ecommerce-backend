const router = require('express').Router();
const { checkSchema } = require('express-validator');

const authController = require('../controllers/auth');
const { validation } = require('../helpers');
const authSchema = require('../helpers/schema/auth');

router.post('/login', checkSchema(authSchema.login), validation, authController.login);
router.post('/register', checkSchema(authSchema.register), validation, authController.register);
router.post('/forgot_password', checkSchema(authSchema.resetRequest), validation, authController.resetRequest);
router.post('/forgot_password/:code', checkSchema(authSchema.resetPassword), validation, authController.resetPassword);

module.exports = router;
