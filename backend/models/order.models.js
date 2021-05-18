const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  apartments: { type: Object },
  firstName: { type: String  },
  surname: { type: String  },
  email: { type: String },
  phone: { type: String },
  statusSubmited: { type: String },
  dataSubmited: { type: String },
  idSubmited: { type: String },
  dataOrder: { type: String },
  status: { type: String },
  idOrder: { type: String },
});

module.exports = mongoose.model('Order', postSchema);
