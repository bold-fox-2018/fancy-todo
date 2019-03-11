# Fancy Todo

## URLs
Client URL : `http://localhost:8080`<br>
Server URL : `http://localhost:3000`

## Usage
Make sure you have Node.js and npm installed in your computer, and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after a sign in / sign up action on the client-side.

## Routes

| Route | HTTP | Headers(s) | Body | Description | Success Case | Error Case |
|-------|------|------------|------|-------------|--------------|---------|
|`/todos`| **GET** |An Authenticated JWT Token | none | Get all todo list| Show all the todo list | Status code: 500, Error info in JSON |
|`/todos`| **POST** |An Authenticated JWT Token | name: String(**Required**),<br>description: String(**Required**),<br>due_date: Date(**Required**),<br>status: String(**Default: uncompleted**),<br>user_id: ObjectId(**Required**) | Create a todo | Show the created todo | Status code: 500, Error info in JSON|
|`/todos/:id` | **GET** | An Authenticated JWT Token | none | Get a single todo info | Show the todo info | Status code: 500, Error info in JSON|
|`/todos/:id` | **PUT** |An Authenticated JWT Token | name: String(**Required**),<br>description: String(**Required**),<br>due_date: Date(**Required**) | Update a todo information | Show the updated todo info |Status code: 500, Error info in JSON |
|`/todos/:id` | **DELETE** |An Authenticated JWT Token | none | Delete a todo information | Show the deleted todo info | Status code: 500, Error info in JSON |