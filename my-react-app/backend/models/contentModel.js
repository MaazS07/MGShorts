// contentModel.js

const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({

  image: {
    data: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }

});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
