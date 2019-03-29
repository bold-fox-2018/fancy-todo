const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/fancyTodo', { useNewUrlParser: true }) //promsie


let todoSchema = new Schema({
    name: String,
    description: String,
    status: String,
    due_date: String,
    userId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo