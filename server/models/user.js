const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hash } = require('../helpers/bcrypt');

let userSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate: [
            {
                validator: function(value) {
                    return /^[a-zA-Z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(value);
                },
                message: 'Invalid email'
            },
            {
                validator: function(value) {
                    return mongoose.model('Users', userSchema).find({
                        _id: {
                            $ne: this._id
                        },
                        email: value
                    })
                    .then(data => {
                        if(data.length !== 0) {
                            return false;
                        }
                    })
                    .catch(err => {
                        return err.message;
                    });
                },
                message: 'Email has been used'
            }
        ]
    },
    password: {
        type: String,
        set: function(password) {
            this._password = this.password;
            return password;
        }
    }
})

userSchema.pre('save', function(next) {
    this.password = hash(this.password)
    this.email = this.email.toLowerCase()
    next()
})

userSchema.pre('findOneAndUpdate', function(next) {
    this._update.password = hash(this._update.password)
    this._update.email = this._update.email.toLowerCase()
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User