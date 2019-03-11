const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    require: [true, 'Task required']
  },
  description:{
    type: String,
    require:[true,'Description can\'t empty']
  },
  status: {
    type: Boolean,
    default: false
  }, 
  due_date: {
    type: Date,
    require:[true,'Date can\'t empty']
  }
})

let Todo = mongoose.model('Todos', todoSchema)

module.exports = Todo