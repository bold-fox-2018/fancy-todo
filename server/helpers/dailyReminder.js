
const Todo = require('../models/todo')
const sendEMail = require('../helpers/sendEmail')


function morningEmail(){
    let today = new Date

    Todo
        .find()
        .populate('user')
        .then(todos => {
            todos.forEach(todo => {
                if(todo.dueDate.toDateString(), today.toDateString()) {
                    sendEMail(todo.user.email, todo.name)            
                }
            })
            
        })
        .catch(err => {
            console.log(err);         
        })

}

module.exports = morningEmail