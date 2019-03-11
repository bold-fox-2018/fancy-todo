
function projectForm() {

    $('.main-page').hide()
    $('#project-form').append(`
    <form id="project-form">
      <div class="form-group">
        <label>project name:</label>
        <input type="text" class="form-control" id="name">
      </div>
        <div class="form-group">
        <label>project description:</label>
        <input type="text" class="form-control" id="description">
    </div>
      <div class="form-group">
        <label>Due Date:</label>
        <input type="date" class="form-control" id="dueDate">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`)
}


$('#project-form').submit(function (event) {
    event.preventDefault
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/projectTodo`,
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val(),
            admin: personalData._id
        },
        headers: {
            "token": localStorage.getItem('token')
        }
    })
        .done(response => {
            getProject()

        })
        .fail(response => {
            swal('field cannot be blank')
        })
})

function getProject() {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/projectTodo/${personalData.email}`,
        headers: {
            "token": localStorage.getItem('token')
        }

    })
        .done(response => {
            console.log(response,"==reposne get project");
            
            clean()
            $('#sidenav').show()
            $('#navbar').show()
            $('#project-page').append(`<a href ="#" onClick="projectForm()">add new project<a>`)
            let html = ''
            response.data[0].projects.forEach(project => {
                html += `<div class="alert alert-primary" role="alert">
                <a href ="#" onclick="projectDetail('${project.name}', '${project.description}', '${project.dueDate}', '${project._id}')">${project.name}</a>
              </div>`

                // html += `<p><a href ="#" onclick="projectDetail('${project.name}', '${project.description}', '${project.dueDate}', '${project._id}')">${project.name}</a>  <a href="#"><i class="fa fa-plus" aria-hidden="true"></i></a></p>`
            })
            $('#project-page').append(html)

        })
        .fail(response => {
            swal('internal server error')
        })
}

function projectDetail(name, description, dueDate, id) {
    let date = new Date(dueDate).toLocaleDateString()

    clean()
    $('#sidenav').show()
    $('#navbar').show()
    $('#project-detail').append(
        `<div class="card w-50">
                <div class="card-body">
                <p>${name}</p>
                <p>${description}</p>
                <p>${date}</p>                          
                <a href="#" class="btn btn-primary" onClick ="updateProject('${id}')">add member</a>
                <a href="#" class="btn btn-primary" onClick ="deleteProject('${id}')">delete</a>
                <a href="#" class="btn btn-primary" onClick ="getTodoProject('${id}')">see project todo list</a>
                </div>
                </div>`)
}

function deleteProject(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/project/${id}`,
        data: personalData,
        headers: {
            "token": localStorage.getItem('token')
        }
    })
        .done(response => {
            getProject()
            console.log(response);

        })
        .fail(response => {
            swal("you're not allowed to do this action")

        })
}

function getTodoProject(id) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/projectTodoList/${id}`,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .done(response => {
            

            if (response.data.todoList.length == 0) {
                clean()
                $('#sidenav').show()
                $('#navbar').show()
                $('#project-todo-list').append(`<p>your project has no active todo list</p>
            <p><a href="#" onClick ="todoFormProject('${response.data._id}')">add new todolist</a>`)
            } else {
                clean()
                $('#navbar').show()
                $('#sidenav').show()
                let html = ''
                response.data.todoList.forEach(todo => {
                let date = new Date(todo.dueDate).toLocaleDateString()
                    
                html+= `
                <div class="card w-50">
                <div class="card-body">
                <p> PIC : ${todo.user.first_name} ${todo.user.last_name}</p>
                <p> task : ${todo.name}</p>
                <p> description : ${todo.description}</p>
                <p> DueDate : ${date}</p>    
                <p> Status : ${todo.status}   </p>                   
                <a href="#" class="btn btn-primary" onClick ="updateTodo('${todo._id}')">complete</a>
                <a href="#" class="btn btn-primary" onClick ="deleteTodo('${todo._id}')">delete</a>
                </div>
                </div>`
                })

                $('#project-todo-list').append(`<p><a href="#" onClick ="todoFormProject('${response.data._id}')">add new todolist</a> ${html}`)
            }

        })
        .fail(response => {
            console.log(response);

        })
}

function todoFormProject(input) {

    clean()
    $('#navbar').show()
    $('#sidenav').show()

    $('#todo-project-form').append(`<form id="todo-form">
      <div class="form-group">
        <label>name:</label>
        <input type="text" class="form-control" id="name">
      </div>
        <div class="form-group">
        <label>description:</label>
        <input type="text" class="form-control" id="description">
    </div>
      <div class="form-group">
        <label>Due Date:</label>
        <input type="date" class="form-control" id="dueDate">
      </div>
      <input class="form-control" id="project_id" type="hidden" value="${input}">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`)

}

$("#todo-project-form").submit(function (event) {
    event.preventDefault
    $.ajax({
        url: `http://localhost:3000/fancytodo/todo`,
        headers: {
            "token": localStorage.getItem('token')
        },
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val(),
            id: $('#project_id').val(),
            owner: 'project'

        },
        method: 'POST'
    })
        .done(Response => {
            // $('#todo-form').empty()
            getProject()
        })
        .fail(err => {
            swal('opps field cannot be blank')
            console.log(err)
        })
})




function updateProject(project) {
    console.log(project, "===============");

    $('#add-member').append(`
    <form id="add-member">
    <div class="form-group">
      <label>your team email:</label>
      <input value="${project}" id="id" type="hidden">
      <input type="text" class="form-control" id="email-member">
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`)
}

$('#add-member').submit(function (event) {
    event.preventDefault
    let email = $('#email-member').val()
    let id = $(`#id`).val()
    console.log(id, email);

    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/projectTodo/${id}`,
        data: {
            email: email
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            getProject()

        })
        .fail(err => {
            swal("opps, make sure you input right email")
        })
})