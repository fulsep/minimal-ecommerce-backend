const router = require('express').Router();
const { checkSchema } = require('express-validator');

const addressController = require('../controllers/addresses');
const { validation } = require('../helpers');
const addressSchema = require('../helpers/schema/addresses');

const authMiddleware = require('../middlewares/auth');

router.get('/addresses', authMiddleware.authCheck, checkSchema(addressSchema.list), validation, addressController.list);
router.post('/addresses', authMiddleware.authCheck, checkSchema(addressSchema.create), validation, addressController.create);
router.patch('/addresses/:id', authMiddleware.authCheck, checkSchema(addressSchema.edit), validation, addressController.edit);
router.get('/addresses/:id', authMiddleware.authCheck, checkSchema(addressSchema.detail), validation, addressController.detail);
router.get('/addresses/:id/set_primary', authMiddleware.authCheck, checkSchema(addressSchema.detail), validation, addressController.setPrimary);
router.delete('/addresses/:id', authMiddleware.authCheck, checkSchema(addressSchema.detail), validation, addressController.delete);

module.exports = router;
