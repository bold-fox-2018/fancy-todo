const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
mongoose.connect('mongodb://localhost:27017/Plan', { useNewUrlParser: true })
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todos'
    }]
})

userSchema.pre('save', function(next) {
    this.password = bcryptjs.hashSync(this.password, 8)
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User