# fancy-todo
API Documentation yang meliputi : URLs, HTTP method, request, response (success dan error case) 

## Todo Route
**Note:**  *  *is required*

HTTP  | Route | headers |body | Description | Success | Error
------|-------|--------|-----|--------------|---------|------
GET     | <span style='color:#00cec9'> /todos     </span>   | token |                                               | <span style='color:#00cec9'> Get all Todos (Authenticate User Only) </span>   |           |
GET     | <span style='color:#00cec9'> /todos/:id </span>   | token |                                               | <span style='color:#00cec9'> Get a todo (Authenticate User Only) </span>      |           |
POST    | <span style='color:#00cec9'> /todos     </span>   | token | *name, *description, *due_date                | <span style='color:#00cec9'>  Create a Todo (Authenticate User Only) </span>  |           |
DELETE  | <span style='color:#00cec9'> /todos/:id </span>   | token |                                               | <span style='color:#00cec9'> Delete a Todo (Authenticate User Only)   </span> |           |
PUT     | <span style='color:#00cec9'> /todos/:id </span>   | token |  *name, *description, *due_date, compplete    | <span style='color:#00cec9'> Update a Todo (Authenticate User Only) </span>   |           |

<br>

## User Route

HTTP | ROUTE | body | Description
-----|-------|------|------------
POST    | <span style='color:#00cec9'>/users/formSignIn </span>  |   *email, *password  | <span style='color:#00cec9'> Login / Register User   </span>
POST    | <span style='color:#00cec9'>/users/googleSignIn</span> |   *email             | <span style='color:#00cec9'>Login / Register User Via Google   </span>