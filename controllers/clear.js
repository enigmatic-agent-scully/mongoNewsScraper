var Article = require('../models/article');
var Comment = require('../models/comment');

module.exports = {
  clearDb: (req, res) => {
    Article.deleteMany({})
      .then(() => {
        return Comment.deleteMany({});
      })
      .then(() => {
        res.json({ ok: true });
      });
  }
};
