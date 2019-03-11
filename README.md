# fancy-todo


List of routes:

|   Route               | HTTP  |   Header(s) |Body    | Description

|---------------        |:------    |:---------|:-------|:-----------

|/fancytodo             |POST       | none     | first name :String (**Required**), lastname:String (**Required**),email:String (**Required**), password: string(**required**)    | create new user 

|/signin                |POST       | none     | email:String (**Required**), password: string(**required**)  | regular user login

|/login/google            |POST       | none     | none   | login with google account

|/fancytodo/todo        |POST       | required | name :String (**Required**), description :String (**Required**),dueDate:String (**Required**) | create new todo

|/projectTodo           |POST       | required  | name :String (**Required**), description :String (**Required**),dueDate:String (**Required**)  | create new project

|/fancytodo/            |GET        | required  | none    | find all users data

|/fancytodo/:email      |GET        | required  | none    | find single user data

|/projectTodo/:email    |GET        | required  | none    | find user all projectdata

|/projectTodoList/:id   |GET        | required  | none    | find project's todolists

|/fancytodo/:id         |PATCH      | required  | none    | update todo status

|/fancytodo/:id         |PATCH      | required  | none    | update todo status

|/projectTodo/:id       |PATCH      | required  | user email:String (**Required**)    | add another user to project 


|/fancytodo/:id         |DELETE     | required  |none      | delete todolist


/project/:id            |DELETE     | required  | user id:String (**Required**)  | delete project data **admin only**




# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>

$ npm start <br/>

$ npm run dev
