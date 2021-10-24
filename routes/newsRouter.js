const router = require('express').Router();
const newsCtrl = require('../controllers/newsCtrl');
const auth = require('../middleware/auth');

router.post('/addnews', newsCtrl.addNews);
router.get('/allnews', newsCtrl.allNews);
router.patch('/editnews/:id', newsCtrl.editNews);
router.delete('/deletenews/:id', newsCtrl.deleteNews);
router.get('/news/:id', newsCtrl.news);
router.get('/newsCat/:id', newsCtrl.newsCat);
router.get('/search', newsCtrl.search);
router.patch('/saveNews/:id', auth, newsCtrl.saveNews);
router.patch('/unsaveNews/:user_id/:id', newsCtrl.unSaveNews);
router.get('/getSavedNews', auth, newsCtrl.getSavedNews);
router.post('comment/:id', newsCtrl.comment);
router.post('/addcomment', auth, newsCtrl.addcomment);

module.exports = router;