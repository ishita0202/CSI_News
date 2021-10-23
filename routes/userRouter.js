const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/user/:id', userCtrl.profile);
router.patch('/edituser/:id', userCtrl.edituser);

module.exports = router;