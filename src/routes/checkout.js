const router = require('express').Router();
const { checkSchema } = require('express-validator');

const checkoutController = require('../controllers/checkout');
const { validation } = require('../helpers');
const checkoutSchema = require('../helpers/schema/checkout');

router.get('/checkout', checkoutController.preview);
router.post('/checkout', checkSchema(checkoutSchema.confirm), validation, checkoutController.confirm);

module.exports = router;
