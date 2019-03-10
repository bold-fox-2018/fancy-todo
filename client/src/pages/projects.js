function myProjects() {
    $('#todoContents').empty()
    if (!localStorage.getItem('token')) {
        swal('Unauthorized Access', "", "error")
    } else {
        server({
            url: `/projects`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            allMyProjects = data

            let currentProjects = ``
            if (data.length === 0) {
                currentProjects = `
                <tr>
                    <td>You got no Projects, you might wanna add some or check your notifications</td>
                </tr>
                `
            } else {
                data.forEach(project => {
                    currentProjects += `
                        <tr>
                            <td>${project.name}</td>
                            <td>${project.users.length}</td>
                            <td><a href="#" onclick="getProject('${project._id}')">See Detail</a></td>
                        </tr>
                    `
                });
            }

            $('#todoContents').append(`
            <div id="abortedAddingMembers"></div>
            <h1 style="text-align: center;" class="my-5">Your Project List</h1>
            <div class="mx-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Projects</th>
                            <th scope="col">Members</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="myListOfTodos">
                        ${currentProjects}
                    </tbody>
                </table>
            </div>
            `)            
        })
        .catch(err => {
            console.log(err)
        })
    }
}

function todoActions(creator, id, projectId) {
    let todoActions = `<td><strong>-</strong></td>`
    if (creator == localStorage.getItem('id')) {
        todoActions = `<td><a href="#" onclick="getTodoInProject('${id}', '${projectId}')">Update</a> | <a href="#" onclick="removeTodoFromProject('${id}', '${projectId}')">Delete</a></td>`
    }
    return todoActions
}

function getProject(id) {
    $('#todoContents').empty()

    server({
        url: `/projects/${id}`,
        method: 'get',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
        let creator = ''
        let userList = ``
        let action = `<td><strong>-</strong></td>`
        let currentTodosInProject = ``
        let inviteMembersButton = ``

        if (data.creator._id == localStorage.getItem('id')) {
            creator = "You are the creator of this project"
            inviteMembersButton = `<button class="btn btn-block btn-primary" onclick="inviteMember('${id}')">Invite Member</button>`
        } else {
            creator = data.creator.name
        }

        data.users.forEach(user => {
            if (user._id != localStorage.getItem('id') && data.creator._id == localStorage.getItem('id')) {
                action = `<td><a href="#" onclick="removeMember('${user._id}', '${id}')">Remove Member</a></td>`
            }
            userList += `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    ${action}
                </tr>
            `
        })

        if (data.todos.length == 0) {
            currentTodosInProject = `
            <tr>
                <td>You got no todos, you might wanna add some</td>
            </tr>
            `
        } else {
            data.todos.forEach(td => {
                let statusChecked = ``
                if (td.status === 'checked') {
                    statusChecked = `<img src="https://img.icons8.com/flat_round/64/000000/checkmark.png" height="30px">`
                }
    
                if (td.urgency === 'regular') {
                    currentTodosInProject += `    
                    <tr>
                        <td>${statusChecked}</td>
                        <td>${td.name}</td>
                        <td>${convertDate(td.due_date)}</td>
                        <td>${td.urgency}</td>
                        ${todoActions(data.creator._id, td._id, id)}
                    </tr>
                  `
                } else if (td.urgency === 'important') {
                    currentTodosInProject += `
                    <tr class="table-success">
                        <td>${statusChecked}</td>
                        <td>${td.name}</td>
                        <td>${convertDate(td.due_date)}</td>
                        <td>${td.urgency}</td>
                        ${todoActions(data.creator._id, td._id, id)}
                    </tr>                
                    `
                } else {
                    currentTodosInProject += `
                    <tr class="table-warning">
                        <td>${statusChecked}</td>
                        <td>${td.name}</td>
                        <td>${convertDate(td.due_date)}</td>
                        <td>${td.urgency}</td>
                        ${todoActions(data.creator._id, td._id, id)}
                    </tr>                
                    `
                }
            });
        }

        $('#todoContents').append(`
        <div class="mx-5 col-10">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#detail">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#members">Members</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#todos">Todos</a>
                </li>
            </ul>
            <div id="myTabContent" class="tab-content my-4">
                <div class="tab-pane fade show active" id="detail">
                    <legend>Project Details</legend>
                    <ul>
                        <li>
                            <strong>Project Name: </strong><br>
                            <ul><li>${data.name}</li></ul>
                        </li>
                        <li>
                            <strong>Project Description: </strong><br>
                            <ul><li>${data.description}</li></ul>
                        </li>
                        <li>    
                            <strong>Project Admin: </strong><br>
                            <ul><li>${creator}</li></ul>
                        </li>
                        <li>
                            <strong>Member Registered: </strong><br>
                            <ul><li>${data.users.length} user(s)</li></ul>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade" id="members">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="userList">
                            ${userList}
                        </tbody>
                    </table>

                    ${inviteMembersButton}
                </div>
                <div class="tab-pane fade" id="todos">
                    <h1 style="text-align: center;">Project's Todos</h1>
                    <button class="btn btn-block btn-primary my-3" onclick="addProjectTodoForm('${id}')">Add New Todo</button>
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
                            ${currentTodosInProject}
                        </tbody>
                    </table>  

                    <div id="editTodoFromInProject" class="my-5"></div>
                </div>
            </div>
        </div>

        <div id="todoFormInProject"></div>
        <div id="editTodoFormInProject"></div>
        `)
    })
    .catch(err => {
        console.log(err)
    })
}

function addProjectTodoForm(id) {
    $('#todoFormInProject').empty()
    $('#editTodoFormInProject').empty()
    $('#todoFormInProject').append(`
    <form class="mx-5 my-5" id="createTodoInProject">
        <fieldset>
            <legend style="text-align: center; font-size: 3em;">Add Project</legend>
            <div class="form-group">
                <legend>Todo</legend>
                <input class="col-7" type="text" class="form-control"placeholder="e.g. Pergi Ke Kebun Binatang" id="project_todo_input_">
            </div>
            <div class="form-group">
                <legend for="exampleTextarea">Description</legend>
                <input class="col-7" type="text" class="form-control"placeholder="description" id="project_description_input_">
            </div>
            <div class="my-3">
                <legend>Due Date</legend>
                <input type="date" id="project_date_input_">
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
            <button type="submit" style="max-width: 704px;" class="btn btn-primary btn-block">Add Todo</button>
        </fieldset>
    </form>        
    `)

    $('#createTodoInProject').submit(function(event) {
        event.preventDefault()
        const data = {
            name: $('#project_todo_input_').val(),
            description: $('#project_description_input_').val(),
            due_date: $('#project_date_input_').val(),
            urgency: $("input[name='urgency']:checked").val()
        }
        console.log(data, id)
        if (!localStorage.getItem('token')) {
            swal('Unauthorized Access!', "", "error")
        } else {
            server({
                url: `/projects/add-todo/${id}`,
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    name: $('#project_todo_input_').val(),
                    description: $('#project_description_input_').val(),
                    due_date: $('#project_date_input_').val(),
                    urgency: $("input[name='urgency']:checked").val()
                }
            })
            .then(({data}) => {
                $('#todoFormInProject').empty()
                $('#todoContents').empty()
                $('#todoContents').append(`
                    <h4>Updating Todo... </h4>
                    <img style="margin: 0 auto; text-align: center;" src="https://thumbs.gfycat.com/OblongUnrulyBobcat-max-1mb.gif">
                `)
                setTimeout(function () {
                    $('#todoContents').empty()
                    getProject(id)
                }, 2000)
                setTimeout(function () {
                    swal("Okay!", "Todo has been successfully created!", "success")
                }, 2200)
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
}

function removeTodoFromProject(id, projectId) {
    server({
        url: `/projects/delete-todo-from-project/${id}`,
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
        setTimeout(function () {
            $('#todoContents').empty()
            getProject(projectId)
        }, 2000)
    })
    .catch(err => {
        console.log(err)
    })
}

function getTodoInProject(id, projectId) {
    $('#todoFormInProject').empty()
    $('#editTodoFormInProject').empty()
    server({
        url: `/projects/get-project-todo/${id}`,
        method: 'get',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
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

        $('#editTodoFormInProject').append(`
            <form class="mx-5 my-5" id="editTodoFromProject">
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

        $('#editTodoFromProject').submit(function(event) {
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
                $('#editTodoFormInProject').empty()
                $('#todoContents').empty()
                $('#todoContents').append(`
                    <h4>Updating Todo... </h4>
                    <img style="margin: 0 auto; text-align: center;" src="https://thumbs.gfycat.com/OblongUnrulyBobcat-max-1mb.gif">
                `)
                setTimeout(function () {
                    getProject(projectId)
                    $('#todoContents').empty()
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

function removeMember(id, projectId) {
    swal({
        title: "Are you sure want to delete member from your project?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            server({
                url: `/projects/remove-member/${id}/${projectId}`,
                method: 'delete',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                $('#todoContents').empty()
                $('#todoContents').append(`
                    <h4>Deleting a member... </h4>
                    <img style="margin: 0 auto; text-align: center;" src="https://thumbs.gfycat.com/OblongUnrulyBobcat-max-1mb.gif">
                `)
                setTimeout(function () {
                    $('#todoContents').empty()
                    getProject(projectId)
                }, 2000)
                setTimeout(function () {
                    swal("Member has been deleted from the project!", {
                      icon: "success",
                    });
                }, 2200)
            })
            .catch(err => {
                console.log(err)
            })
        } 
      });
}

function inviteMember(id) {
    $('#editTodoFormInProject').empty()
    $('#editTodoFormInProject').append(`
        <form class="mx-5 my-5" id="addMemberToProject">
            <div class="form-group">
                <legend>Invite Members</legend>
                <input class="col-7" data-role="tagsinput" type="text" class="form-control"placeholder="Write your friend's username" id="invite_member_input_">
            </div>
            <button type="submit" style="max-width: 704px;" class="btn btn-primary btn-block">Submit</button>
        </form>     
    `)

    $('#addMemberToProject').submit(function(event) {
        event.preventDefault()
        server({
            url: `/projects/invite-member/${id}`,
            method: 'patch',
            headers: {
                access_token: localStorage.getItem('token')
            },
            data: {
                invitedUsers: $('#invite_member_input_').val()
            }
        })
        .then(({data}) => {
            $('#todoContents').empty()
            $('#todoContents').append(`
                <h4>Inviting some members... </h4>
                <img style="margin: 0 auto; text-align: center;" src="https://thumbs.gfycat.com/OblongUnrulyBobcat-max-1mb.gif">
            `)
            setTimeout(function () {
                $('#todoContents').empty()
                getProject(id)
            }, 2000)
            setTimeout(function () {
                swal("Okay!", "Todo has been successfully updated!", "success")
            }, 2200)
        })
        .catch(err => {
            console.log(err)
        })
    })
}

function addProjectForm() {
    $('#todoContents').empty()
    $('#todoContents').append(`
    <form class="mx-5 my-5" id="createProject">
        <fieldset>
            <legend style="text-align: center; font-size: 3em;">Add Todo</legend>
            <div class="form-group">
                <legend>Project</legend>
                <input class="col-7" type="text" class="form-control"placeholder="e.g. Membuat aplikasi berbasis Jawa Tengah" id="project_input_">
            </div>
            <div class="form-group">
                <legend>Description</legend>
                <input class="col-7" type="text" class="form-control"placeholder="Description" id="description_input_">
            </div>
            <div class="form-group">
                <legend>Invite Members</legend>
                <input class="col-7" data-role="tagsinput" type="text" class="form-control"placeholder="Write your friend's username" id="invited_users_input_">
            </div>
            <button type="submit" style="max-width: 704px;" class="btn btn-primary btn-block">Submit</button>
        </fieldset>
    </form>
    `)

    $('#createProject').submit(function(event) {
        event.preventDefault()
        if (!localStorage.getItem('token')) {
            swal('Unauthorized Access!', "", "error")
        } else {
            server({
                url: `/projects`,
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    name: $('#project_input_').val(),
                    description: $('#description_input_').val(),
                    invitedUsers: $('#invited_users_input_').val()
                }
            })
            .then(({data}) => {
                console.log(data.userNotFound)
                $('#todoContents').empty()
                $('#todoContents').append(`
                    <h4>Creating Project... </h4>
                    <img style="margin: 0 auto; text-align: center;" src="https://thumbs.gfycat.com/OblongUnrulyBobcat-max-1mb.gif">
                `)
                setTimeout(function () {
                    $('#todoContents').empty()
                    myProjects()
                }, 2000)
                setTimeout(function () {
                    swal("Okay!", "Project has been created!", "success")
                    if (data.userNotFound.length > 0) {
                        $('#abortedAddingMembers').append(`
                            <h4 style="color: red;">Sorry we can not found these usernames ${data.userNotFound.join(', ')}</h4>
                        `)
                    }
                }, 2500)
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
}