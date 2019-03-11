var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')
const hash = require('../helper/hash');
// mongoose.connect('mongodb://localhost:27017')

var userSchema = new Schema({
    name: String,
    address: String,
    password: String,
    email: String,
    loginVia: String,
    todo: [{
        type: Schema.Types.ObjectId,
        ref: 'Todos'
    }],
});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hash(this.password)
    }
    next()
})

userSchema.path('email')
    .validate(function (value) {
        const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/g

        return emailRegex.test(value)
    }, 'Email not valid')
userSchema.pre('save', function (next) {
    User.findOne({
            email: this.email
        })
        .then(function (data) {
            if (data) {

                next(new Error(`Email already exist`))
            } else {
                next()
            }
        })
        .catch(next)
})








let User = mongoose.model('Users', userSchema)


module.exports = User