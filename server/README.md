# fancy-todo-server

# Server Documentation

## User End Points
|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/signup_|**POST**|none|name, username, email, password|Manual sign up
|_/login|**POST**|none|username, password|Manual Sign In and Google Sign In|
|_/users_|**GET**|none|none|Get All usernames|
|_/users/:id_|**GET**|none|none|Get User by Id|

## Todo End Points
|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/todos|**GET**|access_token|none|Get user's todos|
|_/todos|**POST**|access_token|name, description, due_date, urgency|Create todo|
|_/todos/:id_|**GET**|access_token|none|Get todo from User|
|_/todos/:id_|**PATCH**|access_token|none|Edit Todo|
|_/todos/:id_|**DELETE**|access_token|none|Delete Todo|

## Project End Points
|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/projects|**GET**|access_token|none|Get user's projects|
|_/projects|**POST**|access_token|name, description, invited members|Create project|
|_/projects/look-invitation|**GET**|access_token|none|Get all user's invitations to join projects|
|_/projects/add-todo/:id|**POST**|access_token|name, description, due_date, urgency|Create todo|
|_/projects/get-project-todo/:todoId_|**GET**|access_token|none|Get user's todo by id|
|_/projects/delete-todo-from-project/:id_|**DELETE**|access_token|none|Delete Todo from Project|
|_/projects/invite-member/:id_|**PATCH**|access_token|none|Invite member to a project|
|_/projects/remove-member/:memberId/:projectId_|**DELETE**|access_token|none|Delete member from the project|
|_/projects/add-user/:id|**PATCH**|access_token|none|Add user to a project|
|_/projects/user-accepting-invitation/:id|**PATCH**|access_token|none|Accept project member invitation|
|_/projects/user-rejecting-invitation/:id|**PATCH**|access_token|none|Reject project member invitation|
|_/projects/:id_|**GET**|access_token|none|Get specific project list by Id|
|_/projects/:id/:todoId_|**DELETE**|access_token|none|Delete specific todo in project|


## Usage
```
npm install
npm start
live-server --host=localhost (Run it on client side)
```
> Run on http://localhost:8080