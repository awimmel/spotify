const mongoose = require('mongoose');
const Schema = .Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateEntered: {
    type: Date,
    required: true
  },
  dateModified: {
    type: Date,
    required: true
  }
});
module.exports = Item = mongoose.model('User', UserSchema);