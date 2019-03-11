const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltrounds = Number(process.env.SALTROUNDS)

const ENV = require('dotenv')
ENV.config()

const dbName = process.env.DATABASE_NAME
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let UserSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// salting password
UserSchema.pre('save', function(next) {
    var user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(saltrounds, function(err, salt) {
        if (err) {
            return next(err)
        } else {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err)
                } else {
                    user.password = hash
                    next()
                }
            })
        }
    })
})

var Users = mongoose.model('Users', UserSchema)

// unique email
UserSchema.path('email').validate(function(value, respond) {
    return mongoose.model('Users')
        .countDocuments({ email: value })
        .exec()
        .then(function(count) {
            return !count
        })
        .catch(function(err) {
            throw err
        })
}, 'Email Already Exist')

// unique username
UserSchema.path('username').validate(function(value, respond) {
    return mongoose.model('Users')
        .countDocuments({ username: value })
        .exec()
        .then(function(count) {
            return !count
        })
        .catch(function(err) {
            throw err
        })
}, 'Username Already Exist')

module.exports = Users