# API Documentation

##### Basic Url : /todoapi/

### Todo Routes

List of routes todo:

| Route      | HTTP   | Header(s) | Body                                                         | Description                 |
| ---------- | ------ | --------- | ------------------------------------------------------------ | --------------------------- |
| /todo      | GET    | token     | none                                                         | Get all books               |
| /todo/:id  | GET    | token     | none                                                         | Get a single book           |
| /todo/user | GET    | token     | none                                                         | Get all  book by user ID    |
| /todo/     | POST   | token     | userId:String**(Required)**, name:String**(Required)**, description:String**(Required)**, due_date: date**(Required)**, | Create a todo               |
| /book      | DELETE | token     | none                                                         | Delete a todo               |
| /book/:id  | PUT    | token     | userId:String, name:String, description:String, due_date: date, status:boolean | Update a todo with new info |

List of filter routes:

| Route                       | HTTP | Description        |
| --------------------------- | ---- | ------------------ |
| /todo?status=<true>/<false> | GET  | Get todo by status |



### User Routes

List of user routes:

| Route     | HTTP | Header(s) | Body                                                         | Description       |
| --------- | ---- | --------- | ------------------------------------------------------------ | ----------------- |
| /user     | GET  | none      | none                                                         | Get all user      |
| /user/:id | GET  | none      | none                                                         | Get a single user |
| /user/    | POST | none      | fullname:String**(Required)**, username:String**(Required)**, password:String**(Required)**, email:String**(Required)**, via:String**(Required)** | Create a user     |



### SignIn Routes

List of routes SignIn:

| Route   | HTTP | Header(s) | Body                                                         | Description            |
| ------- | ---- | --------- | ------------------------------------------------------------ | ---------------------- |
| /local  | POS  | none      | username:String**(Required)**, password:String**(Required)** | Sign in through local  |
| /google | POS  | none      | id_token:String**(Required)**                                | Sign in through google |

