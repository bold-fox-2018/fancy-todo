const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  token: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: 43200
  }
});

let Token = mongoose.model('token', tokenSchema);

module.exports = Token;
