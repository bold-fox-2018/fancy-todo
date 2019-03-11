const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
mongoose.connect('mongodb://localhost/fancy-todo', { useNewUrlParser: true})

const Schema = mongoose.Schema

let userSchema = new Schema({
    email: String,
    password: String,
    todos: [{
        type: Schema.Types.ObjectId, ref: 'todos'
    }]
})

userSchema.pre('save', function(next){
    const saltRounds = 5
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
    next()
})

let User = mongoose.model('users', userSchema)

module.exports = User