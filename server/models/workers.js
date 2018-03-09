const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

//Workers Schema
const WorkersSchema   = new Schema({
  fname: String,
  lname: String,
  address: String
});

module.exports = mongoose.model('Workers', WorkersSchema);