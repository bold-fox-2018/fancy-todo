# fancy-todo
API Documentation yang meliputi : URLs, HTTP method, request, response (success dan error case) 

## Todo Route
**Note:**  *  *is required*

HTTP  | Route | headers |body | Description | Success | Error
------|-------|--------|-----|--------------|---------|------
GET     | <span style='color:#00cec9'> /todos     </span>   | token |                                               | <span style='color:#00cec9'> Get all Todos (Authenticate User Only) </span>   | Objects [{ id, name, description, complete, pinned, due_date }]                   | Object { message: `Internal Server Error`, err }
GET     | <span style='color:#00cec9'> /todos/:id </span>   | token |                                               | <span style='color:#00cec9'> Get a todo (Authenticate User Only) </span>      | Object { id, name, description, complete, pinned, due_date }                      | Object { message: `Internal Server Error`, err }
POST    | <span style='color:#00cec9'> /todos     </span>   | token | *name, *description, *due_date                | <span style='color:#00cec9'>  Create a Todo (Authenticate User Only) </span>  | a new Todo -> Object { id, name, description, complete, pinned, due_date }        | Object { message: `Internal Server Error`, err }
DELETE  | <span style='color:#00cec9'> /todos/:id </span>   | token |                                               | <span style='color:#00cec9'> Delete a Todo (Authenticate User Only)   </span> | a deleted Todo -> Object { id, name, description, complete, pinned, due_date }    | Object { message: `Internal Server Error`, err }
PUT     | <span style='color:#00cec9'> /todos/:id </span>   | token |  *name, *description, *due_date, complete     | <span style='color:#00cec9'> Update a Todo (Authenticate User Only) </span>   | a updated Todo -> Object { id, name, description, complete, pinned, due_date }    | Object { message: `Internal Server Error`, err }

<br>

## User Route

HTTP | ROUTE | body | Description | Success | Error
-----|-------|------|-------------|---------|------
POST    | <span style='color:#00cec9'>/users/formSignIn </span>  |   *email, *password  | <span style='color:#00cec9'> Login / Register User   </span>          | Object { token, email } | Object { message: `Internal Server Error`, error }
POST    | <span style='color:#00cec9'>/users/googleSignIn</span> |   *email             | <span style='color:#00cec9'>Login / Register User Via Google   </span>| Object { token, email } | Object { message: `Internal Server Error`, error }