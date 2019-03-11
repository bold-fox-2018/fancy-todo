const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: String,
    description: String,
    complete: Boolean,
    pinned: Boolean,
    due_date: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todos', todoSchema);

module.exports = Todo;