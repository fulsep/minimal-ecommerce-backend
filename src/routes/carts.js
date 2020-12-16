const router = require('express').Router();
const { checkSchema } = require('express-validator');

const cartController = require('../controllers/carts');
const { validation } = require('../helpers');
const cartSchema = require('../helpers/schema/carts');

router.get('/carts', checkSchema(cartSchema.list), validation, cartController.list);
router.get('/carts/:id', checkSchema(cartSchema.addToCart), validation, cartController.addToCart);

module.exports = router;
