/* eslint-disable new-cap */
const router = require('express').Router();

const cartController = require('../controllers/carts');

router.get('/', cartController.getList);
router.get('/:id', cartController.directAddItem);
module.exports = router;
