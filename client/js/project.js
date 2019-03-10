
function getAllProjectTodo(projectName) {

  $('.main-content').empty()

  if (projectName === "All Task") {
    $('.main-content').append(`<h4 class="mt-3 mb-3">All tasks in your projects </h4>`)
  } else {
    $('.main-content').append(`<h4 class="mt-3 mb-3">${projectName} </h4>`)
  }
  let link = null
  if (projectName == "All Task") {
    link = `${serverUrl}/projects`
  } else {
    link = `${serverUrl}/projects/?name=${projectName}`
  }
  $.ajax({
    url: link,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(Response => {
      if (Response.length > 0) {
        Response.forEach(userproject => {
          getList(userproject.todos, projectName)
        })
      } else {
        console.log('belum ada project')
        $('.main-content').append(`<h3>No projects, click "+Add Project" to create new project</h3>`)
      }
    })
    .fail(err => {
      console.log(err)
    })
}

$('#AddProjectTaskForm').submit((event) => {
  event.preventDefault()
  var body = {
    name: $("#project-task-name").val(),
    description: $("#project-description").val(),
    due_date: $("#project-due-date").val(),
    project: $('#project-selection').val()
  }

  $.ajax({
    url: `${serverUrl}/todos`,
    headers: {
      "token": localStorage.getItem('token')
    },
    data: body,
    method: 'POST'
  })
    .done(() => {
      $('#exampleModal3a').modal('toggle')
      getHome()
    })
    .fail(err => {
      console.log(err.responseJSON.msg)
      console.log(err)
      $('#AddProjectTaskError').html(`<h6 style="color:red;">${err.responseJSON.msg}</h6>`)
    })
})

function getProjectList() {
  $('#nav-projects').empty()
  $.ajax({
    url: `${serverUrl}/projects`,
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(Response => {
      $('#nav-projects').append(`
          <a class="nav-link active" data-toggle="pill" onclick="getAllProjectTodo('All Task')" href="#"><i
          class="fas fa-list-ul" style="color: green;"></i> All Task</a>
          <a class="nav-link" data-toggle="pill" href="#"><i class="fas fa-calendar-day"
              style="color: rgb(206, 77, 60);"></i>
            Today</a>
          <a class="nav-link" data-toggle="pill" href="#"><i class="far fa-star"
              style="color: rgb(250, 214, 54);"></i> Starred</a>
          <div>
            <hr>
          </div>
          <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal5">+Add Projects</a>
        `)
      let index = 0
      Response.forEach(project => {
        console.log(project)

        $('#nav-projects').append(`
            <a class="nav-link" data-toggle="pill" href="#" onclick="getAllProjectTodo('${project.name}')"><i class="fas fa-project-diagram"
              style="color: rgb(252, 99, 79);"></i> ${project.name}</a>
              <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal6" data-id="${project._id}" data-name="${project.name}" data-date="${project.due_date}"><i class="fas fa-user-plus"
              style="color: rgb(250, 214, 54);"></i> Add New Member</a>
            <div class="nav-link" id="member-list-${index}">
              <p><i class="fas fa-users"
              style="color: rgb(250, 214, 54);"></i> ${project.name} Member </p>
              
            </div>
         `)
        $('#project-selection').append(`
            <option value="${project._id}">${project.name}</option>
         `)
        project.users.forEach(user => {
          $(`#member-list-${index}`).append(`<p><i class="far fa-user"
          style="color: rgb(250, 214, 54);"></i> ${user.fullName}</p>`)
        })
        index++
      })
    })
    .fail(err => {
      console.log(err)
    })
}

$('#exampleModal6').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget)
  let id = button.data('id')
  let name = button.data('name')
  let date = button.data('date')
  console.log("MODAL", name, date)

  let modal = $(this)
  modal.find('#AddNewMember').val(id)
  modal.find('#project-name6').val(name)
  modal.find('#due-date6').val(date)
  // modal
  getAllMember()
})

function getAllMember() {
  $.ajax({
    url: `${serverUrl}/users`,
    method: `get`,
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(users => {
      users.forEach(user => {
        $('#all-member-in-db').append(`
          <option value="${user._id}">${user.fullName}</option>
          `)
      })
    })
    .fail(err => {
      console.log(err)
    })

}

$('#AddNewMember').submit((event) => {
  event.preventDefault()
  let body = {
    userId: $('#all-member-in-db').val()
  }
  let projectId = $('#AddNewMember').val()
  $.ajax({
    url: `${serverUrl}/projects/${projectId}`,
    data: body,
    method: 'POST',
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(()=> {
      console.log('add member success')
      $('#exampleModal6').modal('toggle')
      getSideBar('project')
    })
    .fail(err => {
      console.log(err)
    })
})

$('#AddProjectForm').submit((event) => {
  event.preventDefault()
  var body = {
    name: $("#project-name").val(),
    description: $("#description3").val(),
    due_date: $("#due-date3").val()
  }

  $.ajax({
    url: `${serverUrl}/projects`,
    headers: {
      "token": localStorage.getItem('token')
    },
    data: body,
    method: 'POST'
  })
    .done(() => {
      console.log("create project success")
      $('#exampleModal5').modal('toggle')
      getProjectList()
    })
    .fail(err => {
      console.log(err.responseJSON.msg)
      $('#AddProjectError').html(`<h6 style="color:red;">${err.responseJSON.msg}</h6>`)
    })

})
