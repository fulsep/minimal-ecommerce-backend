const router = require('express').Router();
const { checkSchema } = require('express-validator');

const checkoutController = require('../controllers/checkout');
const { validation } = require('../helpers');
const checkoutSchema = require('../helpers/schema/checkout');

const authMiddleware = require('../middlewares/auth');

router.get('/checkout', authMiddleware.authCheck, checkoutController.preview);
router.post('/checkout', authMiddleware.authCheck, checkSchema(checkoutSchema.confirm), validation, checkoutController.confirm);

module.exports = router;
