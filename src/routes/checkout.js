/* eslint-disable new-cap */
const router = require('express').Router();

const checkoutController = require('../controllers/checkout');

router.get('/', checkoutController.getBeforeGenerate);
router.post('/', checkoutController.generateInvoice);

module.exports = router;
