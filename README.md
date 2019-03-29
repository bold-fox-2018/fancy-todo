# fancy-todo

A single page application that can add a list of stuff to do. User must login first todo stuff.

## List of user routes:

Route             | HTTP   | Request                     | Response
----------------- | ------ | --------------------------- | ----------------------------------------------------
user/signup       | POST   | body(name, email, password) | On success a new user will be created in the                                                                    database, an error will be shown if fail
user/signin       | POST   | body(name, email, password) | On success a token will be generated in local                                                                   storage and todo list will be appear, an error                                                                  will be shown if fail
user/googleSignIn | POST   | body(id_token)              | You will be asked to authenticate through google,                                                               on success you will be able to see your todo list
user/tokenProfile | GET    | header(token)               | Get user info based on the token sent

## List of todo routes:

Route       | HTTP   | Request                                              | Response
----------- | ------ | ---------------------------------------------------- | --------------------------
todo/list   | GET    | header(userEmail)                                    | Find a list of todo based on the                                                                                user's email, nothing will be                                                                                   shown if there is no todo yet
todo/new    | POST   | body(name, description, status, due_date, userEmail) | Create a new todo in the database                                                                               and refreshes client's todo list
todo/update | POST   | body(name, description, status, due_date, userEmail) | Updates todo specification
todo/delete | DELETE | body(id)                                             | Deletes a todo
todo/video  | GET    | header(description)                                  | Search for a youtube video based                                                                                on the description of the todo