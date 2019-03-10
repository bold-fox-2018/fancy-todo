function myTodos() {
    $('#todoContents').empty()
    let currentTodos = ''
    if (allMyTodos.length === 0) {
        currentTodos = `
        <tr>
            <td>You got no todos, you might wanna add some</td>
        </tr>
        `
    } else {
        allMyTodos.forEach(td => {
            let statusChecked = ``
            if (td.status === 'checked') {
                statusChecked = `<img src="https://img.icons8.com/flat_round/64/000000/checkmark.png" height="30px">`
            }

            if (td.urgency === 'regular') {
                currentTodos += `    
                <tr>
                    <td>${statusChecked}</td>
                    <td>${td.name}</td>
                    <td>${convertDate(td.due_date)}</td>
                    <td>${td.urgency}</td>
                    <td><a href="#" onclick="getTodo('${td._id}')">Update</a> | <a href="#" onclick="removeTodo('${td._id}')">Delete</a></td>
                </tr>
              `
            } else if (td.urgency === 'important') {
                currentTodos += `
                <tr class="table-success">
                    <td>${statusChecked}</td>
                    <td>${td.name}</td>
                    <td>${convertDate(td.due_date)}</td>
                    <td>${td.urgency}</td>
                    <td><a href="#" onclick="getTodo('${td._id}')">Update</a> | <a href="#" onclick="removeTodo('${td._id}')">Delete</a></td>
                </tr>                
                `
            } else {
                currentTodos += `
                <tr class="table-warning">
                    <td>${statusChecked}</td>
                    <td>${td.name}</td>
                    <td>${convertDate(td.due_date)}</td>
                    <td>${td.urgency}</td>
                    <td><a href="#" onclick="getTodo('${td._id}')">Update</a> | <a href="#" onclick="removeTodo('${td._id}')">Delete</a></td>
                </tr>                
                `
            }
        });
    }

    $('#todoContents').append(`
        <h1 style="text-align: center;">Your Todos</h1>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Todo</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Urgency</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id="myListOfTodos">
                ${currentTodos}
            </tbody>
        </table>

        <div id="editForm" class="my-5"></div>
    `)
}

function fetchTodos() {
    server({
        url: `/todos`,
        method: 'get',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
        allMyTodos = data
    })
    .catch(err => {
        console.log(err)
    })
}

function addTodoForm() {
    $('#todoContents').empty()
    $('#todoContents').append(`
    <form class="mx-5 my-5" id="createTodo">
        <fieldset>
            <legend style="text-align: center; font-size: 3em;">Add Todo</legend>
            <div class="form-group">
                <legend>Todo</legend>
                <input class="col-7" type="text" class="form-control"placeholder="e.g. Pergi Ke Kebung Binatang" id="todo_input_">
            </div>
            <div class="form-group">
                <legend for="exampleTextarea">Description</legend>
                <input class="col-7" type="text" class="form-control"placeholder="description" id="description_input_">
            </div>
            <div class="my-3">
                <legend>Due Date</legend>
                <input type="date" id="date_input_">
            </div>
            <fieldset class="form-group">
                <legend>Urgency Status</legend>
                <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency"  value="regular">
                    Regular
                </label>
                </div>
                <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency" value="important">
                    Important
                </label>
                </div>
                <div class="form-check disabled">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency" value="urgent">
                    Urgent
                </label>
                </div>
            </fieldset>
            <button type="submit" style="max-width: 704px;" class="btn btn-primary btn-block">Submit</button>
        </fieldset>
    </form>
    `)

    $('#createTodo').submit(function(event) {
        event.preventDefault()

        let currentTime = Date.now()
        let inputDate = Date.parse($('#date_input_').val())
        if (inputDate < currentTime) {
            swal(`Invalid Due Date!`, '', 'error')
        } else {
            server({
                url: '/todos',
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    name: $('#todo_input_').val(),
                    description: $('#description_input_').val(),
                    due_date: $('#date_input_').val(),
                    urgency: $("input[name='urgency']:checked").val()
                }
            })
            .then(({data}) => {
                fetchTodos()
                setTimeout(function () {
                    myTodos()
                }, 200)
            })
            .catch(err => {
                swal('Error!', 'Invalid input!', 'error')
    
                // if (!err.response.data.err.errors.name.message) {
                //     swal(`${err.response.data.err}`, "", 'error')
                // } 
                // else if (err.response.data.err.errors.name.message) {
                //     swal(`${err.response.data.err.errors.name.message}`, '', 'error')
                // }
            })
        }

    })
}

function todoMenu() {
    $('#todoContents').empty()
    $('#todoContents').append(`
        <div style="text-align: center;">
            <h1 style="font-family: 'Srisakdi', cursive; font-size: 4em;" class="mb-5">Fancy Todo</h1>
            <h3>Good Day!</h3>
            <h4>WDYWTD (What Do You Want To Do?)</h4>
            <div class="my-5 justify-content-center">
            <button type="button" style="font-size: 1.5em; max-width: 1200px; margin:0 auto;" class="btn btn-primary btn-block my-2" onclick="addTodoForm()">Add A Todo</button>
            <button type="button" style="font-size: 1.5em; max-width: 1200px; margin:0 auto;" class="btn btn-primary btn-block my-2" onclick="addProjectForm()">Add A Project</button>
            </div>
            </div>
        `)
    }
        
function getTodo(id) {
    $('#editForm').empty()
    server({
        url: `/todos/${id}`,
        method: 'get',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
        console.log(data)
        let populateStatus = ``
        let populateUrgencyStatus = ``
        if (data.status === 'checked') {
            populateStatus = `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="status_edit" value="checked" checked>
                    checked
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="status_edit" value="unchecked" >
                    unchecked
                </label>
            </div>
            `
        } else {
            populateStatus = `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="status_edit"  value="checked">
                    checked
                </label>
            </div>
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="status_edit" value="unchecked" checked>
                    unchecked
                </label>
            </div>
            `
        }

        if (data.urgency === 'regular') {
            populateUrgencyStatus = `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit"  value="regular" checked>
                    Regular
                </label>
                </div>
                <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit" value="important">
                    Important
                </label>
                </div>
                <div class="form-check disabled">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit" value="urgent">
                    Urgent
                </label>
            </div>
            `
        } else if (data.urgency === 'important') {
            populateUrgencyStatus = `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit"  value="regular">
                    Regular
                </label>
                </div>
                <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit" value="important" checked>
                    Important
                </label>
                </div>
                <div class="form-check disabled">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit" value="urgent">
                    Urgent
                </label>
            </div>
            `
        } else {
            populateUrgencyStatus = `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit"  value="regular">
                    Regular
                </label>
                </div>
                <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit" value="important">
                    Important
                </label>
                </div>
                <div class="form-check disabled">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="urgency_edit" value="urgent" checked>
                    Urgent
                </label>
            </div>
            `
        }

        $('#editForm').append(`
            <form class="mx-5 my-5" id="editTodo">
                <legend style="text-align: center; font-size: 3em;">Edit Todo</legend>
                <fieldset class="form-group">
                    <legend>Status</legend>
                    ${populateStatus}
                </fieldset>
                <fieldset>
                    <div class="form-group">
                        <legend>Todo</legend>
                        <input class="col-7" type="text" class="form-control"placeholder="e.g. Pergi Ke Kebung Binatang" value="${data.name}" id="todo_input_edit">
                    </div>
                    <div class="form-group">
                        <legend for="exampleTextarea">Description</legend>
                        <input class="col-7" type="text" class="form-control"placeholder="description" value="${data.description}" id="description_input_edit">
                    </div>
                    <div class="my-3">
                        <legend>Due Date</legend>
                        <input type="date" id="date_input_edit" value="${data.due_date.substring(0, 10)}">
                    </div>
                    <fieldset class="form-group">
                        <legend>Urgency Status</legend>
                        ${populateUrgencyStatus}
                    </fieldset>
                    <button type="submit" style="max-width: 704px;" class="btn btn-primary btn-block">Done</button>
                </fieldset>
            </form>
        `)

        $('#editTodo').submit(function(event) {
            event.preventDefault()
            server({
                url: `/todos/${id}`,
                method: 'patch',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    name: $('#todo_input_edit').val(),
                    status: $("input[name='status_edit']:checked").val(),
                    description: $('#description_input_edit').val(),
                    due_date: $('#date_input_edit').val(),
                    urgency: $("input[name='urgency_edit']:checked").val()
                }
            })
            .then(({data}) => {
                $('#editForm').empty()
                $('#todoContents').empty()
                $('#todoContents').append(`
                    <h4>Updating Todo... </h4>
                    <img style="margin: 0 auto; text-align: center;" src="https://thumbs.gfycat.com/OblongUnrulyBobcat-max-1mb.gif">
                `)
                fetchTodos()
                setTimeout(function () {
                    $('#todoContents').empty()
                    myTodos()
                }, 2000)
                setTimeout(function () {
                    swal('Todo has been successfully updated', "", 'success')
                }, 2500)
            })
            .catch(err => {
                if (!err.response.data.err.errors.name.message) {
                    swal(`${err.response.data.err}`, "", 'error')
                } 
                if (err.response.data.err.errors.name.message) {
                    swal(`${err.response.data.err.errors.name.message}`, '', 'error')
                }
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
}

function removeTodo(id) {
    server({
        url: `/todos/${id}`,
        method: 'delete',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
        $('#todoContents').empty()
        $('#todoContents').append(`
            <h4>Deleting Todo... </h4>
            <img style="margin: 0 auto; text-align: center;" src="https://thumbs.gfycat.com/OblongUnrulyBobcat-max-1mb.gif">
        `)
        fetchTodos()
        setTimeout(function () {
            $('#todoContents').empty()
            myTodos()
        }, 2000)
    })
    .catch(err => {
        console.log(err)
    })
}