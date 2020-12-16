const router = require('express').Router();
// const { checkSchema } = require('express-validator');

const profileController = require('../controllers/profile');
// const { validation } = require('../helpers');
// const profileSchema = require('../helpers/schema/profile');

const authMiddleware = require('../middlewares/auth');

router.get('/profile', authMiddleware.authCheck, profileController.info);
// router.patch('/profile', authMiddleware.authCheck, profileController.detail);
// router.post('/profile', authMiddleware.authCheck, profileController.detail);

module.exports = router;
