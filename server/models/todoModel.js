const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    name: String,
    description: String,
    status: String,
    due_date: Date,
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Todo = mongoose.model('Todo', TodoSchema)
module.exports = Todo