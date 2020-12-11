/* eslint-disable new-cap */
const router = require('express').Router();

const profileController = require('../controllers/profile');

router.get('/', profileController.get);
router.patch('/', profileController.update);
router.post('/change_avatar', profileController.changeAvatar);

module.exports = router;
