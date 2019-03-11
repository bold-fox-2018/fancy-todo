
const TodoList = require('../models/todo')
const User = require('../models/user')
const checkDate = require('../helpers/checkToDoDate')

class todoController{

    // create new todo
    static create(req,res) {

        // check the date
        let dateCheck = checkDate(req.body.dueDate)
        console.log("Cek Input", req.body)
        console.log("Cek Decoded Input", req.loggedInUser)
        TodoList.create({
            title: req.body.title,
            description: req.body.description,
            status: 'INCOMPLETE',
            duedate: dateCheck,
            todouserid: req.body.userId
        })
          .then(todolist => {
            let newTodo = todolist  
            
            // Push todo to the user table
            User.findOneAndUpdate({
                _id: todolist.todouserid
            }, {$push: { listsTask: todolist._id} })
             .then(user => {
                console.log("hasil push new todo:", user)
                res.status(200).json({
                    msg: 'Todolist successfully created',
                    data: newTodo
                }) 
             })
             .catch(error => {
                res.status(500).json({
                    msg: 'ERROR Create Todolist: ',error
                })
             })
          })
          .catch(error => {
              res.status(500).json({
                  msg: 'ERROR Create Todolist: ',error
              })
          })
    }

    // display todo by user id
    static displayListTodoByUserid(req,res) {
        //console.log("Cek Input", req.params.userId)
        console.log("Cek Decoded Input", req.loggedInUser._id)
        TodoList.find({
            todouserid: req.loggedInUser._id
        })
          .then(todolists => {
            console.log("Hasil find based on user", todolists)
            let listTodo = todolists  

            // get all todolist
            TodoList.find({})
            .then(lists => {
                let completedTask = 0
                let incompleteTask = 0
                lists.forEach(todo => {
                    if(todo.status === 'COMPLETE'){
                        completedTask +=1
                    }else if(todo.status === 'INCOMPLETE'){
                        incompleteTask +=1
                    }
                })
                res.status(200).json({
                    msg: `List of todo by user ${req.loggedInUser.email}`,
                    data: listTodo,
                    globalcomplete: completedTask,
                    globalincomplete: incompleteTask
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    msg: 'ERROR Populate Todolist after create: ',error
                })        
            })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Display list of Todo ', error
              })
          })
    }

    // display individual todo
    static displayIndividualTodo(req,res) {
        TodoList.findOne({
            _id: req.params.id
        })
         .then(todolist => {
             res.status(200).json({
                msg: 'Detail of todo',
                data: todolist
             })
         })
         .catch(error => {
             res.status(500).json({
                 msg: 'ERROR Display details of Todo ',error
             }) 
         })
    }

    // edit individual todo
    static editIndividualTodo(req,res) {
        console.log("masuk ke edit todolist", req.body, req.loggedInUser._id, req.params)
        TodoList.findOne({
            _id: req.params.id    
        })
         .then(todolist => {
            // check if the user is authorized
            console.log("Ditemukan untuk edit", todolist, todolist.todouserid, req.loggedInUser._id)

                console.log("Ditemukan dan sesuai userid")
                // validate status
                    let editDate = checkDate(req.body.duedate)
                    //update the todo
                    TodoList.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        title: req.body.title,
                        description: req.body.description,
                        status: req.body.status,
                        duedate: editDate,
                        todouserid: req.loggedInUser._id
                    }, {new: true})
                     .then(todoupdate => {
                        console.log("Hasil edit", todoupdate)
                        res.status(200).json({
                            msg: 'Todo has been updated',
                            data: todoupdate
                        })
                     })
                     .catch(error => {
                         res.status(500).json({
                             msg: 'ERROR: ',error
                         })
                     })

         })
         .catch(error=>{
            res.status(500).json({
                msg: 'ERROR Edit details of Todo ',error
            }) 
         })
    } 

    // delete individual todo
    static deleteIndividualTodo(req,res) {
        TodoList.findOne({
            _id: req.params.id
        })
         .then(todolist => {
        
                // remove task id from user table
                User.findOneAndUpdate({
                    _id: req.loggedInUser._id
                }, {$pull: {listsTask: todolist._id}})
                .then(user => {
                    // now delete the todolist
                    TodoList.findOneAndDelete({
                        _id: req.params.id
                    })
                     .then(tododelete => {
                        res.status(200).json({
                            msg: 'Todo has been deleted',
                            data: tododelete
                        })
                     })
                     .catch(error => {
                        res.status(500).json({
                            msg: 'ERROR Delete todo ',error
                        }) 
                     })
                })
                .catch(error => {
                    res.status(500).json({
                        msg: 'ERROR removing todo from user table ',error
                    })
                })
         })
         .catch( error =>{
            res.status(500).json({
                msg: 'ERROR Delete details of Todo ',error
            })
         })
    }
}

module.exports = todoController