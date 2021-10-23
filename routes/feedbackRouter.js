const router = require('express').Router();
const feedbackCtrl = require('../controllers/feedbackCtrl');

router.post('/addfeedback', feedbackCtrl.addfeedback);

module.exports = router;
