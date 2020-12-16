const router = require('express').Router();
const { checkSchema } = require('express-validator');

const invoiceController = require('../controllers/invoices');
const { validation } = require('../helpers');
const invoiceSchema = require('../helpers/schema/invoices');

const authMiddleware = require('../middlewares/auth');

router.get('/invoices', authMiddleware.authCheck, checkSchema(invoiceSchema.list), validation, invoiceController.list);
router.get('/invoices/:id', authMiddleware.authCheck, checkSchema(invoiceSchema.detail), validation, invoiceController.detail);

module.exports = router;
