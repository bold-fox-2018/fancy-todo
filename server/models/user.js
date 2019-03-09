const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('../helpers/bcrypt').hash;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
    validate: {
      validator: function (value) {
        return new Promise((resolve, reject) => {
          User
            .find({ email: value }, function (err, user) {
              if (user.length > 0) {
                reject(false);
              } else {
                resolve(true);
              }
            });
        });
      },
      message: props => 'Email alredy exists!'
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty']
  },
  picture: String
});


userSchema.pre('save', function (next) {
  this.password = hash(this.password);
  next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;

