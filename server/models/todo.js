const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  name: {
    type: String,
    required: [true, 'Todo Name must be filled.'],
    minlength: [3, 'Todo Name length must be higher than 3 character']
  },
  description: {
    type: String,
    required: [true, 'Description must be filled.'],
    minlength: [3, 'Description length must be higher than 3 character']
  },
  status: {
    type: Boolean,
    default: false
  },
  create_date: {
    type: Date
  },
  update_date: {
    type: Date
  },
  due_date: {
    type: Date
  }
});

todoSchema.pre('save', function (next) {
  this.status = false;
  this.create_date = new Date();
  this.update_date = new Date();
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;