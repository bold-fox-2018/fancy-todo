const baseUrl = 'http://localhost:3000/todoapi';
$(document).ready(function() {  
  if(!localStorage.getItem('token')) {
    $('#login-form').show()
    $('#dashboard').hide()
  } else {
    $('#option').html(`
      <li>${localStorage.getItem('fullname')}</li>
      <li><a onclick="signOutGoogle();" id="signout-button">Sign out</a></li>
    `)
    $('#login-form').hide()
    $('#dashboard').show()
    $('.modal').modal();
    
    $('#todo-add').submit(newTodo)
    $('#todo-edit').submit(editTodo)
  } 
})


function generateDashboard(opt = '') {
  $('#list-todo').html('')
  let token = localStorage.getItem('token');

  $.ajax({
    method: 'get',
    url: `${baseUrl}/todo/user${opt}`,
    headers: { token }
  })
  .done(function(data) {
    let html = ''
    
    if(data.length > 0) {
      data.forEach(todo => {
        html += generateCardTodo(todo)
      })
      $('#list-todo').html(html)
    }
  })
  .fail(function(err) {
    console.log(err)
  })
}


function generateCardTodo(todo) {
  return `
  <div class="col s6">
  <div id="${todo._id}" class="card${todo.status ? ` grey lighten-2`: ''}">
    <div class="card-content">
      <h5 class="card-title">${todo.name}</h5>
      <p>${todo.description}</p>
      <hr>
      <p><b>Due Date: </b>${String(todo.due_date).slice(0,10)}</p>
      <!-- <hr> -->
      <p><b>Finish Date: </b>${todo.status ? `${String(todo.update_date).slice(0,10)}`:`-`}</p>
      <p><b>Status: </b>${todo.status ? 'Finish' : 'Not Finish'}</p>
    </div>
    <div class="card-action">
      <a data-id="${todo._id}" class="waves-effect waves-light btn modal-trigger" href="#edit-modal" onclick="showDetail(this)">Edit</a>
      ${todo.status ? 
        `<button data-id="${todo._id}" class="grey waves-effect waves-light btn" onclick=unfinishTodo(this)>Unfinish</button>` : 
        `<button data-id="${todo._id}" class="waves-effect waves-light btn" onclick=finishTodo(this)>finish</button>`}
        <a data-id="${todo._id}" class="right red waves-effect waves-light btn" onclick="deleteTodo(this)">Delete</a>
    </div>
  </div>
  </div>
  `
}

function showDetail(self) {
  let token = localStorage.getItem('token');

  $.ajax({
    method: 'get',
    url: `${baseUrl}/todo/${self.getAttribute('data-id')}`,
    headers: { token }
  })
  .done(function(data) { 

    let editDate = String(data.due_date).slice(0,10);
    $('#edit-id').val(data._id)
    $('#edit-name').val(data.name)
    $('#edit-description').val(data.description)
    $('#edit-due_date').val(editDate)
    if(data.status) {
      $('#edit-status').attr('checked', 'checked')
    }
  })
  .fail(function(err) {
    console.log(err)
  })
} 

function newTodo(self) {
  self.preventDefault()
  const { name, description, due_date } = self.target

  let data = { 
    name: name.value, 
    description: description.value, 
    due_date: due_date.value 
  }

  let token = localStorage.getItem('token');

  $.ajax({
    method: 'post',
    url: `${baseUrl}/todo`,
    headers: { token },
    data
  })
  .done(function(todo) {
    $('#list-todo').append(generateCardTodo(todo))
    $('#todo-edit').each(function(){
      this.reset();
    });
  
  })
  .fail(function(err) {
    let html = ''
    if(err.responseJSON) {
       let list = Object.values(err.responseJSON) 
       list.forEach(warning => {
          html += `<p>${warning.message}</p>`
       })
    }

    $('#warning')
      .html(`
        <div class="card">
          <div class="card-content red">
          ${html}
          </div>
        </div>
      `)
      .addClass('white-text')
      .slideDown(500)

    setTimeout(() => {
      $('#warning')
      .slideUp(500)
    }, 3000);
  })
}

function editTodo(self) {
  self.preventDefault()

  let token = localStorage.getItem('token');
  let editData = {
    name: self.target['edit-name'].value,
    description: self.target['edit-description'].value,
    due_date: self.target['edit-due_date'].value,
    status: self.target['edit-status'].checked,
    update_date: new Date()
  }

  $.ajax({
    method: 'put',
    url: `${baseUrl}/todo/${self.target['edit-id'].value}`,
    headers: { token },
    data: editData
  })
  .done(function(todo) {
    if(todo.status) {
      filterFinished()
    } else {
      filterOngoing()
    }
  })
}

function filterFinished() {
  generateDashboard('?status=true')
  $('#title').html('Fancy Todo - Finished Todos')
}

function showAll() {
  generateDashboard()
  $('#title').html('Fancy Todo - All Todos')
}

function filterOngoing() {
  generateDashboard('?status=false')
  $('#title').html('Fancy Todo - Ongoing Todos')
}

function finishTodo(self) {
  let token = localStorage.getItem('token');

  $.ajax({
    method: 'put',
    url: `${baseUrl}/todo/${self.getAttribute('data-id')}`,
    headers: { token },
    data: { status: true }
  })
  .done(function(todo) {
    if(todo.status) {
      filterFinished()
    } else {
      filterOngoing()
    }
  })
}


function unfinishTodo(self) {
  let token = localStorage.getItem('token');

  $.ajax({
    method: 'put',
    url: `${baseUrl}/todo/${self.getAttribute('data-id')}`,
    headers: { token },
    data: { status: false }
  })
  .done(function(todo) {
    if(todo.status) {
      filterFinished()
    } else {
      filterOngoing()
    }
  })
}

function deleteTodo(self) {
  let token = localStorage.getItem('token')

  $.ajax({
    method: 'delete',
    url: `${baseUrl}/todo/${self.getAttribute('data-id')}`,
    headers: { token }
  })
  .done(function() {
    showAll()
  })
}

