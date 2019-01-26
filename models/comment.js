var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;
