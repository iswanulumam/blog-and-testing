const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = { Article };