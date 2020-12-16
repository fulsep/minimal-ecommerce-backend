const router = require('express').Router();
const { checkSchema } = require('express-validator');

const invoiceController = require('../controllers/invoices');
const { validation } = require('../helpers');
const invoiceSchema = require('../helpers/schema/invoices');

router.get('/invoices', checkSchema(invoiceSchema.list), validation, invoiceController.list);
router.get('/invoices/:id', checkSchema(invoiceSchema.detail), validation, invoiceController.detail);

module.exports = router;
