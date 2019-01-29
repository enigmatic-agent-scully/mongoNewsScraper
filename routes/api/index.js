var router = require('express').Router();
var getRoutes = require('./getArticles');
var commentRoutes = require('./comments');
var articleRoutes = require('./article');
var clearRoutes = require('./clear');

router.use('/get', getRoutes);
router.use('/comments', commentRoutes);
router.use('/articles', articleRoutes);
router.use('/clear', clearRoutes);

module.exports = router;
