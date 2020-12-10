/* eslint-disable new-cap */
const router = require('express').Router();

const productController = require('../controllers/products');

router.get('/', productController.list);

router.post('/', productController.create);

router.get('/:id', productController.detail);

router.patch('/:id', productController.update);

router.delete('/:id', productController.delete);

module.exports = router;
