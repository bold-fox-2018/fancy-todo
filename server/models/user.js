const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {encryptPass} = require('../helpers/password')

const userSchema = new Schema({
    email : {
        type : String,
        trim: true,
        lowercase: true,
        required: [true, `email must be filled`],
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
        validate: [checkUnique, 'Email already taken']
    },
    password : {
        type : String,
        required : [true, `password must be filled`]
    },
    fullName : {
        type : String,
        required : [true, `fullName must be filled`]
    },
    role : {
        type : String,
        required : [true, `role must be filled`]
    },
    source : {
        type: String,
        default : 'manual'
    }
})

userSchema.pre('save', function (next) {
    if(this.password) this.password = encryptPass(this.password)
    next()
})

function checkUnique() {
    return new Promise((resolve, reject) => {
        User.findOne({ email: this.email, _id: { $ne: this._id } })
            .then(data => {
                if (data) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
            .catch(err => {
                reject(false)
            })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User