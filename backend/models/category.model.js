const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  title: { type: String  },
  image: { type: String  },
});

module.exports = mongoose.model('Category', postSchema);
