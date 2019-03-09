const mongoose = require('mongoose');
const Schmea = mongoose.Schema;

let memberSchema = new Schmea({
  members: {
    type: Schmea.Types.ObjectId,
    ref: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = memberSchema;