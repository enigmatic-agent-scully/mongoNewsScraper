var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comments: [
    {
      text: String,
      comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    }
  ]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
