# fancy-todo


### Route


| Route                 | HTTP      | Header(s)     | Body      | Description     |
|-----------------------|:---------:|:-------------:|:----------|----------------:|
| /fancy-todo/users          |GET        | none          | none      |Get all users    |
| /fancy-todo/todo/list/find        |GET        | none          | none      |Get a Todolist by user|
| /fancy-todo/todo/create/           |POST       | none          |  email:String(Required),password:String(Required)      |Create a user|
| /fancy-todo/todo/list/delete/       |DELETE     | none          | none      |Delete a user    |
| /fancy-todo/todo/list/edit        |PUT        | none          |  email:String(Required),password:String(Required)      |Update a user with new info    |


### Usage
command |
------- |
$ live-server --host=localhost |

<br>
Access the Client via http://localhost:8080/