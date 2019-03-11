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
                console.log("klkl");
                console.log(user);
                res.status(201).json(user.todoList[user.todoList.length - 1]);
            })
            .catch(function (err) {
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }

    static list(req, res) {
        User.findOne({ _id: req.userLoggedIn._id }).populate('todoList')
            .then(function (userTodos) {
                res.status(200).json(userTodos.todoList)
            })
            .catch(function (err) {
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }

    static listOne(req, res) {
        Todo.findById({ _id: req.params.id })
            .then(function (todo) {
                res.status(200).json(todo)
            })
            .catch(function (err) {
                res.status(500).json({
                    message: `Internal Server Error`, err
                })
            })
    }

    static update(req, res) {
        console.log(req.body);
        console.log(req.params);
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