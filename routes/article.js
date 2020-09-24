var express = require('express');
var router = express.Router();
// var images = require('../lib/images');
var ArticleController = require('./../controllers/article');
var { authenticate } = require('./../lib/auth');

/*
// @ post with image upload
router.post('/',
  authenticate,
  images.multer.single('image'),
  images.sendUploadToGCS,
  ArticleController.insert
)
*/

router.post('/', authenticate, ArticleController.create);
router.get('/', ArticleController.find);
router.get('/:id', ArticleController.findOne);
router.patch('/:id', authenticate, ArticleController.update);
router.delete('/:id', authenticate, ArticleController.delete);

module.exports = router;