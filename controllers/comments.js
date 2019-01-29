const Comment = require('../models/comment');

module.exports = {
  find: (req, res) => {
    Comment.find({ _headlineId: req.params.id }).then(dbComment => {
      res.json(dbComment);
    });
  },
  create: (req, res) => {
    Comment.create(req.body).then(dbComment => {
      res.json(dbComment);
    });
  },
  delete: (req, res) => {
    Comment.remove({ _id: req.params.id }).then(dbComment => {
      res.json(dbComment);
    });
  }
};
