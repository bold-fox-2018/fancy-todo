# fancy-todo

## Todo or Not Todo

### To-do-list web-app built with Mongoose, Express, and JQuery

## EndPoint List

**user route**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/users/register|POST|none|email = body.email(String), password = body.password(String), role = body.role(String), fullName = body.fullName(String)|register for new user|
|/users/login|POST|none|email = body.email(String), password = body.password(String)|endpoint for user login into app|
|/users/googleauth|POST|none|idToken = body.idToken(String)|endpoint for GoogleSignIn |
|/users/|GET|token|none|fetch all user data (authenticated user only)|

<br>

**todo route**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/todos/|POST|token|name = body.name(String), description = body.description(String), due_date = body.due_date(Date), users = user.id(String)|create new task/todo (registered user only)|
|/todos/|GET|token|users = user.id(String), name = query.name(String)| get all task created by user (registered user only)|
|/todos/:id|GET|token| id = params.id(String)| find specific task (registered user only)|
|/todos/:id|PUT|token| id = params.id(String), name = body.name(String), description = body.description(String), due_date = body.due_date(Date), users = user.id(String) | update specific task (owner of specific task only)|
|/todos/:id|DELETE|token| id = params.id(String) | delete specific task (owner of specific task only)|

<br>

**project route**

Route|HTTP|Header(s)|Require|Description|
|---|---|---|---|---|
|/projects/|POST|token|name = body.name(String), description = body.description(String), due_date = body.due_date(Date), users = user.id(String)|create new project (registered user only)|
|/projects/:id|POST|token|id = params.id(String), users = body.userId(String)| add new member to project with specific id (registered user only)|
|/projects/|GET|token|users = user.id(String), name = query.name(String)| get all project created by user (registered user only)|
|/projects/:id|GET|token|id = params.id(String)| find specific project ( registered user only)|
|/projects/:id|PUT|token|id = params.id(String), name = body.name(String), description = body.description(String), due_date = body.due_date(Date), users = user.id(String)| update project specified by params.id (registered user only)|
|/projects/:id|DELETE|token|id = params.id(String)| delete project specified by params.id (registered user only)|

**Usage:**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
And don't forget to fill the .env file 

server : http://35.197.153.178 
client : http://fancy-todo.greensnorlax.xyz/