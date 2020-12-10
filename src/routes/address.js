/* eslint-disable new-cap */
const router = require('express').Router();

const addressController = require('../controllers/address');

router.get('/', addressController.getList);
router.post('/', addressController.create);
router.patch('/:id', addressController.update);
router.delete('/:id', addressController.delete);

module.exports = router;
