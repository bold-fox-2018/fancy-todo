const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fancy-todo', { useNewUrlParser: true })

const Schema = mongoose.Schema

let todoSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    due_date: Date
})

let Todo = mongoose.model('todos', todoSchema)


module.exports = Todo