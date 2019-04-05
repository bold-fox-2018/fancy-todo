const ToDo = require('../models/todo')
const jwt = require('../helpers/')

class ToDoController{
    static create(req,res){
        const {token, task, description, due_date} = req.body
        jwt.verify(token)
        .then(userId=>{
            return ToDo.create({
                user:userId,
                task,
                description,
                due_date
            })
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
    static read(req,res){
        ToDo.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
    static update(req,res){
        const {id,update} = req.body
        ToDo.findByIdAndUpdate(id,update)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
    static delete(req,res){
        const {id,update} = req.body
        ToDo.findByIdAndDelete(id,update)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = ToDoController