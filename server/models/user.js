const mongoose = require('mongoose')
const { encrypt } = require('../helpers/bcrypt')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        minlength: [3, 'Invalid name input!']
    },
    username: {
        type: String,
        required: true,
        minlength: [5, `Minimum length is 5 for username`],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        validate: [{
            validator: function(v) {
              return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message: "Invalid email format"
          },{
            isAsync: true,
            unique: true,
            validator: function (value, callback) {
              User
                .findOne({
                  email: value
                })
                .then(member => {
                  if (member) {
                    callback(false)
                  } else {
                    callback(true)
                  }
                })
                .catch(err => {
                  console.log('email error: ', err)
                })
            },
            message: "This email is already been used. Please use another email"
          }],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required due to your account security'],
        minlength: [6, 'You need more security! Min password length is 6 characters']
    }
})

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next) {
  const hash = encrypt(this.password);
  this.password = hash
  next()
})

const User = mongoose.model('User', userSchema);

module.exports = User