const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encrypt = require('../helpers/encrypt')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true,
        validate : [{
            isAsync : true,
            validator : function(v,cb) {
                User
                    .findOne({
                        email : v
                    })
                    .then(user =>{
                        if(user && user._id.toString() != this._id.toString()){
                            cb(false)
                        } else {
                            cb(true)
                        }
                    })
                    .catch(err=> {
                        throw err
                    })
            },
            message : 'email has already used'
        }]
    },
    password: {
        type: String,
        required: true
    },
    source: String,
    todoList: [{ type: 'ObjectId', ref: 'Todo' }],
    projects : [{ type: 'ObjectId', ref: 'Project' }],
    // completeTask : [{ type: 'ObjectId', ref: 'Todo' }],
    // score : {
    //     type :Number,
    //     default : 0
    // }
})



userSchema.pre('save', function (next) {
    try {
        var user = this;
        if (!user.isModified('password')) return next();
        encrypt(user, function (err, hash) {
            if (err) {
                next(err)
            } else {
                user.password = hash;
                next();
            }
        })
    } catch (err) {
        next(err)
    }

});
const User = mongoose.model('User', userSchema)

module.exports = User