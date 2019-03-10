const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: String,
        default: 'ongoing'
    },
    due_date: Date,
    userEmail: String
})


todoSchema.pre('save', function (next) {
    this.due_date = new Date(this.due_date)
    next()
})

const Todo = mongoose.model('Todos', todoSchema)

module.exports = Todo