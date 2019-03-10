const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  task: {
    type: String,
    require: [true, 'Task required']
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  bgColor: String
}, {
  timestamps: true  
})

let Todo = mongoose.model('Todos', todoSchema)

module.exports = Todo