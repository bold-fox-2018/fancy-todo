const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Plan', { useNewUrlParser: true })
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    dueDate: Date
})

const Todo = mongoose.model('Todos', todoSchema)

module.exports = Todo