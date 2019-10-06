# fancy-todo

# server

#General
#### deploy site: http://localhost:8080/

### Installation and Getting Started (Do it before running this app in your terminal)
```sh
$ npm init
$ npm install
$ npm run dev (server side)
$ live-server (client side)
``` 

### List of API 

##### Base URL for User and Controller Routing: http://localhost:4000/

#### User Routing (without authentication)
##### User register and sign in
Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/register | POST | sign up for new user |
/users/login | POST | sign in for existing user via website/ google|  

#### User Routing (with authentication)
##### User get detail information

Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/userdata | GET | Get a detail information of a speficic user | 

#### Todolist Routing   
##### Todolist - CRUD
##### All routings need authentication => token: jsonwebtoken (put in req.headers)
##### for routing with :_id => id: todo ID (put in req.params)
##### for POST routing => put title, description, status and duedate in req.body

Route | HTTP | Description | 
----- | ---- | ----------- | 
/todos/register | POST | Create new individual Todo | 
/todos/mytodo | GET | Get all Todo by specific user |
/todos/mytodo/:_id | GET | Create a specific Todo | 
/todos/edit/:_id | PUT | Edit an existing Todo | 
/todos/delete/:_id | DELETE | Delete an existing Todo | 