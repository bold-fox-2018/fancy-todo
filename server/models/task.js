const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Task name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  status: {
    type: String,
    enum: {
      values: ['progress', 'finish'],
      message: 'Status is required'
    },
    trim: true
  },
  due_date: {
    type: Date,
    validate: {
      validator: function (value) {
        return new Promise((resolve, reject) => {
          if (value < new Date) {
            reject(false);
          } else {
            resolve(true);
          }
        });
      },
      message: props => 'Please input valid date'
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'project',
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: null
  }
});

let Task = mongoose.model('task', taskSchema);
module.exports = Task;
