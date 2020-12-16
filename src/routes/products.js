const router = require('express').Router();
const { checkSchema } = require('express-validator');

const productController = require('../controllers/products');
const { validation } = require('../helpers');
const productSchema = require('../helpers/schema/products');

router.get('/products', checkSchema(productSchema.list), validation, productController.list);
router.get('/products/:id', checkSchema(productSchema.detail), validation, productController.detail);

module.exports = router;
