/* eslint-disable new-cap */
const router = require('express').Router();

const flashsaleController = require('../controllers/flashsale');

router.get('/', flashsaleController.list);

router.post('/', flashsaleController.create);

router.patch('/:flashsaleId', flashsaleController.update);

router.delete('/:flashsaleId', flashsaleController.delete);

module.exports = router;
