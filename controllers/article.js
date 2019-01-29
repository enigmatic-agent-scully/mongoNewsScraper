const Article = require('../models/article');

module.exports = {
  findAll: (req, res) => {
    Article.find(req.query)
      .sort({ date: -1 })
      .then(dbArticle => {
        res.json(dbArticle);
      });
  },
  delete: (req, res) => {
    Article.remove({ _id: req.params.id }).then(dbArticle => {
      res.json(dbArticle);
    });
  },
  update: (req, res) => {
    Article.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).then(dbArticle => {
      res.json(dbArticle);
    });
  }
};
