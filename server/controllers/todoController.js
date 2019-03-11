const Todo = require('../models/todo');
const User = require('../models/user');

class TodoController {
    static craete(req, res) {
        console.log("req. body");
        console.log(req.body);
        Todo.create(req.body)
            .then(function (newTodo) {

                return User.findOneAndUpdate({ _id: req.userLoggedIn }, { $push: { todoList: newTodo._id } }, { new: true }).populate('todoList')
            })
            .then(function (user) {
                res.status(201).json(user.todoList[user.todoList.length - 1]);
            })
            .catch(function (err) {
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }

    static list(req, res) {
        console.log(req.query.word);
        User.findOne({ _id: req.userLoggedIn }).populate('todoList')
            .then(function (userTodos) {
                if (req.query.word) {
                    let results = [];
                    userTodos.todoList.forEach(e => {
                        if (e.name.indexOf(req.query.word) != -1) results.push(e)
                    });
                    res.status(200).json(results);
                }
                else res.status(200).json(userTodos.todoList);
            })
            .catch(function (err) {
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }

    static update(req, res) {
        Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(function (todo) {
                res.status(200).json(todo)
            })
            .catch(function (err) {
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }

    static delete(req, res) {
        Todo.findOneAndDelete({ _id: req.params.id })
            .then(function (todo) {
                console.log(todo);
                return User.findOneAndUpdate({ _id: req.userLoggedIn }, { $pull: { todoList: todo._id } }, { new: true }).populate('todoList')
            })
            .then(function (user) {
                res.status(200).json(user.todoList)
            })
            .catch(function (err) {
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }
}
module.exports = TodoController;