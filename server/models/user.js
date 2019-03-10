const mongoose = require('mongoose')
const bcrypt = require ('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'Email required'],
        unique: [true, 'Email already exits'],
        validate: {
            validator: function(email) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
            },
            message: 'Email not valid'
        } 
    },
    password: {
        minlength:8,
        maxlength:20,
        type: String,
        require: [true, 'Password required']
    }
}, {
    timestamps: true
})
userSchema.pre('save', function(next) {
        var user = this;
    
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();
    
        // generate a salt
        bcrypt.genSalt(5, function(err, salt) {
            if (err) return next(err);
    
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
    
                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });
    
    
let User = mongoose.model('Users', userSchema)
 
module.exports = User