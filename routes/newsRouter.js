const router = require('express').Router();
const newsCtrl = require('../controllers/newsCtrl');

router.post('/addnews', newsCtrl.addNews);
router.get('/allnews', newsCtrl.allNews);
router.patch('/editnews/:id', newsCtrl.editNews);
router.delete('/deletenews/:id', newsCtrl.deleteNews);
router.get('/news/:id', newsCtrl.news);
router.get('/newsCat/:id', newsCtrl.newsCat);
router.get('/search', newsCtrl.search);

module.exports = router;