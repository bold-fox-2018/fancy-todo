# fancy-todo
API Documentation yang meliputi : URLs, HTTP method, request, response (success dan error case) 
## Todo Route
**Note:**  *  *is required*
HTTP  | Route | headers |body | Description | Success | Error
------|-------|--------|-----|--------------|---------|------
GET     | <span > /todo/read    </span>   | token |                                               | <span > Get all Todos (Authenticate User Only) </span>   | Objects [{ id, name, description, status, dueDate }]                   | Object { message: `Internal Server Error`, err }
POST    | <span > /todo/create     </span>   | token | *name, *description, *dueDate                | <span >  Create a Todo (Authenticate User Only) </span>  | a new Todo -> Object { id, name, description, status, dueDate }        | Object { message: `Internal Server Error`, err }
PUT     | <span > /todo/update </span>   | token |  *name, *description, *dueDate, status     | <span > Update a Todo (Authenticate User Only) </span>   | a updated Todo -> Object { id, name, description, status, dueDate }    | Object { message: `Internal Server Error`, err }
DELETE  | <span > /todo/delete </span>   | token |                                               | <span > Delete a Todo (Authenticate User Only)   </span> | a deleted Todo -> Object { id, name, description, status, dueDate }    | Object { message: `Internal Server Error`, err }

<br>
## User Route
HTTP | ROUTE | body | Description | Success | Error
-----|-------|------|-------------|---------|------
POST    | <span >/user/login </span>  |   *email, *password  | <span > Login User   </span>          | Object { token, email } | Object { message: `Internal Server Error`, error }
POST    | <span >user/register</span> |   *email             | <span > Register User  </span>| Object { token, email } | Object { message: `Internal Server Error`, error }

<br>
## Sign Route
HTTP | ROUTE | body | Description | Success | Error
-----|-------|------|-------------|---------|------
POST    | <span style='color:#00cec9'>/login </span>  |   *email, *password  | <span style='color:#00cec9'> Login User Using Google  </span>          | Object { token, email } | Object { message: `Internal Server Error`, error }