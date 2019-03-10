const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  local: {
    fullname: {
      type: String,
      required: [true, 'Name must be filled.'],
      minlength: [5, 'Name length must be higher than 5 character']
    },
    username: {
      type: String,
      required: [true, 'Username must be filled.'],
      minlength: [5, 'Username length must be higher than 5 character']
    },
    password: {
      type: String,
      required: [true, 'Password must be filled.'],
      minlength: [8, 'Password length must be higher than 8 character']
    },
    email: {
      type: String,
      required: [true, 'Email must be filled.'],
      unique: true,
      validate: {
        validator: function(value) {
          return /^[^@]+@[^@].+[^@]/.test(value);
        },
        message: function() {`email is not valid!`}
      }
    }
  },
  google: {
    fullname: String,
    email: String
  }
})

userSchema.pre('save', function(next){
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})


const User = mongoose.model('User', userSchema);

module.exports = User;