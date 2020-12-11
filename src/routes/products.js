/* eslint-disable new-cap */
const router = require('express').Router();

const productController = require('../controllers/products');

router.get('/', productController.list);

router.post('/', productController.create);

router.get('/:productId', productController.detail);

router.patch('/:productId', productController.update);

router.delete('/:productId', productController.delete);

module.exports = router;
