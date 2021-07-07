const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const todoScheme = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description:  String,
    dueDate: {
        type: Date
    },
    status: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: false
});

const Todo = mongoose.model('Todo', todoScheme)
module.exports = Todo