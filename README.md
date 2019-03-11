# fancy-todo
API Documentation yang meliputi : URLs, HTTP method, request, response (success dan error case) 
## Todo Route
**Note:**  *  *is required*
HTTP  | Route | headers |body | Description | Success | Error
------|-------|--------|-----|--------------|---------|------
GET     | <span style='color:#00cec9'> /todo/read    </span>   | token |                                               | <span style='color:#00cec9'> Get all Todos (Authenticate User Only) </span>   | Objects [{ id, name, description, status, dueDate }]                   | Object { message: `Internal Server Error`, err }
POST    | <span style='color:#00cec9'> /todo/create     </span>   | token | *name, *description, *dueDate                | <span style='color:#00cec9'>  Create a Todo (Authenticate User Only) </span>  | a new Todo -> Object { id, name, description, status, dueDate }        | Object { message: `Internal Server Error`, err }
PUT     | <span style='color:#00cec9'> /todo/update </span>   | token |  *name, *description, *dueDate, status     | <span style='color:#00cec9'> Update a Todo (Authenticate User Only) </span>   | a updated Todo -> Object { id, name, description, status, dueDate }    | Object { message: `Internal Server Error`, err }
DELETE  | <span style='color:#00cec9'> /todo/delete </span>   | token |                                               | <span style='color:#00cec9'> Delete a Todo (Authenticate User Only)   </span> | a deleted Todo -> Object { id, name, description, status, dueDate }    | Object { message: `Internal Server Error`, err }

<br>
## User Route
HTTP | ROUTE | body | Description | Success | Error
-----|-------|------|-------------|---------|------
POST    | <span style='color:#00cec9'>/user/login </span>  |   *email, *password  | <span style='color:#00cec9'> Login User   </span>          | Object { token, email } | Object { message: `Internal Server Error`, error }
POST    | <span style='color:#00cec9'>user/register</span> |   *email             | <span style='color:#00cec9'> Register User  </span>| Object { token, email } | Object { message: `Internal Server Error`, error }