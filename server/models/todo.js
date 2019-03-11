const mongoose = require('mongoose')
const Schema = mongoose.Schema

let toDoSchema = mongoose.Schema({
  description: String,
  status : Boolean
})

let ToDo = mongoose.model('todo',toDoSchema)


module.exports = ToDo