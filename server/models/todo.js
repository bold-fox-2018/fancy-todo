const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: {
    type: Number,
    ref: 'User',
    required: [true, 'User ID must be filled.'],
  },
  name: {
    type: String,
    required: [true, 'Todo Name must be filled.'],
    minlength: [3, 'Todo Name length must be higher than 3 character']
  },
  tasklist: [{
    description: String,
    status: {
      type: Boolean,
      default: false
    }
  }],
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
  this.create_date = new Date();
  this.update_date = new Date();
  next();
});

todoSchema.post('findOneAndUpdate', function(todo, next) {
  if(todo.tasklist.length > 0) {
    let complete = true;
    todo.tasklist.forEach(task => {
      if(!task.status) {
        complete = false;
      }
    })

    todo.status = complete ? true : false
    todo.save();
  }
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;