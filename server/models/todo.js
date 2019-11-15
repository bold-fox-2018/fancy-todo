var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true
})

var todoSchema = new Schema({
    name: String,
    description: String,
    due_date: Date,
    status: String
});



let Todo = mongoose.model('Todos', todoSchema)



module.exports = Todo