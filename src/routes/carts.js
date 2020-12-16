const router = require('express').Router();
const { checkSchema } = require('express-validator');

const cartController = require('../controllers/carts');
const { validation } = require('../helpers');
const cartSchema = require('../helpers/schema/carts');

const authMiddleware = require('../middlewares/auth');

router.get('/carts', authMiddleware.authCheck, checkSchema(cartSchema.list), validation, cartController.list);
router.get('/carts/:id', authMiddleware.authCheck, checkSchema(cartSchema.addToCart), validation, cartController.addToCart);

module.exports = router;
