const router = require('express').Router();
const Article = require('../../models/article');

router.get('/', (req, res) => {
  Article.find({ saved: false })
    .sort({ date: -1 })
    .then(dbArticles => {
      res.render('home', { articles: dbArticles });
    });
});

router.get('/saved', (req, res) => {
  Article.find({ saved: true })
    .sort({ date: -1 })
    .then(dbArticles => {
      res.render('saved', { articles: dbArticles });
    });
});

module.exports = router;
