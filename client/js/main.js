var baseUrl = 'http://localhost:3000';

$(document).ready(function () {
  checkUser();

  $('#navUser').hide();
  $(".email-signup").hide();

  $("#signup-box-link").click(function (e) {
    e.preventDefault();
    $(".email-login").fadeOut(100);
    $(".email-signup").delay(300).fadeIn(300);
    $("#login-box-link").removeClass("active");
    $("#signup-box-link").addClass("active");
  });

  $("#login-box-link").click(function (e) {
    e.preventDefault();
    $(".email-login").delay(200).fadeIn(300);;
    $(".email-signup").fadeOut(100);
    $("#login-box-link").addClass("active");
    $("#signup-box-link").removeClass("active");
  });

  $('#task-date').datetimepicker();

  $('#update').hide();

  $('#task-contents').hide();

});


$('#mytodos').click(function () {
  event.preventDefault();
  $('#mytodos').addClass('active');
  $('#projects').removeClass('active');
  $('#task-contents').show();
});

$('#projects').click(function () {
  event.preventDefault();
  $('#mytodos').removeClass('active');
  $('#projects').addClass('active');
  $('#task-contents').hide();
});

function signUp() {
  event.preventDefault();

  $.ajax({
    method: 'post',
    url: baseUrl + '/register',
    data: {
      name: $('#register-name').val(),
      email: $('#register-email').val(),
      password: $('#register-password').val()
    }
  })
    .done(response => {
      console.log(response.message);
      $('#register-name').val('');
      $('#register-email').val('');
      $('#register-password').val('');
    })
    .fail(err => {
      console.log(err.responseJSON);
      $('#register-name').val('');
      $('#register-email').val('');
      $('#register-password').val('');
    });
}

function login() {
  event.preventDefault();

  $.ajax({
    method: 'post',
    url: baseUrl + '/login',
    data: {
      email: $('#login-email').val(),
      password: $('#login-password').val()
    }
  })
    .done(response => {
      console.log(response);
      localStorage.setItem('token', response.token);
      checkUser();
      $('#login-email').val('');
      $('#login-password').val('');
      $('#list-tasks').html('');
    })
    .fail(err => {
      console.log(err.responseJSON.message);
      $('#login-email').val('');
      $('#login-password').val('');
    });
}

function signOut() {
  event.preventDefault();
  localStorage.removeItem('token');
  $('#form-register-login').show();
  $('#navUser').hide();
  $('#task-contents').hide();
}

function checkUser() {
  if (localStorage.getItem('token')) {
    findTasks();
    $.ajax({
      method: 'get',
      url: baseUrl + '/auth',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(response => {
        // console.log(response);
        let greetings = checkTime();
        $('#intro-name').html(`<strong>${greetings}, ${response.name}.</strong>`);
        $('#form-register-login').hide();
        $('#navUser').show();
        $('#task-contents').show();
      })
      .fail(err => {
        console.log(err);
      });
  }
}

function checkTime() {
  let hr = new Date().getHours();
  let result;
  if (hr >= 0 && hr < 5) {
    result = 'Good Night'
  } else if (hr >= 5 && hr < 12) {
    result = 'Good Moring'
  } else if (hr >= 12 && hr < 17) {
    result = 'Good Afternoon'
  } else {
    result = 'Good Evening'
  }
  return result;
}

function addTask() {
  event.preventDefault();

  $.ajax({
    method: 'post',
    url: baseUrl + '/tasks',
    data: {
      name: $('#task-name').val(),
      description: $('#task-description').val(),
      status: $('#task-status').val(),
      due_date: $('#task-date').val(),
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      $('#taskModal').modal('toggle');
      let task = response.task;
      let date = convertDate(task.due_date);
      $('#list-tasks').append(`
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body d-flex flex-column">
              <p id="status" class="card-text"><i>${task.status}</i></p>
              <h4 class="card-title align-self-center"><b>${task.name}</b></h4>
              <p class="card-text align-self-center">${task.description}</p>
              <p class="card-text align-self-end">${date}</p>
              <div class="align-self-end">
                <a href="" class="btn btn-default btn-sm task-update" data-toggle="modal" data-target="#taskModal" data-id="${task._id}">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="" id="delete-task" class="btn btn-danger btn-sm task-delete" data-id="${task._id}">
                  <i class="fas fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        `);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      });
      $('#task-name').val('');
      $('#task-description').val('');
      $('#task-status').val('');
      $('#task-date').val('');
    })
    .fail(err => {
      console.log(err);
    });
}

function findTasks() {
  // console.log($('#task-status').val());
  $('#list-tasks').empty();

  $.ajax({
    method: 'get',
    url: baseUrl + '/tasks',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(tasks => {
      $.each(tasks, (idx, task) => {
        let date = convertDate(task.due_date);
        // console.log(task._id);
        // console.log($(this).parents('#list-tasks'));
        $('#list-tasks').append(`
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body d-flex flex-column">
              <p id="status" class="card-text"><i>${task.status}</i></p>
              <h4 class="card-title align-self-center"><b>${task.name}</b></h4>
              <p class="card-text align-self-center">${task.description}</p>
              <p class="card-text align-self-end">${date}</p>
              <div class="align-self-end">
                <a href="" class="btn btn-default btn-sm task-update" data-toggle="modal" data-target="#taskModal" data-id="${task._id}">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="" id="delete-task" class="btn btn-danger btn-sm task-delete" data-id="${task._id}">
                  <i class="fas fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        `);
      })
      $('#task-name').val('');
      $('#task-description').val('');
      $('#task-status').val('');
      $('#task-date').val('');
    })
    .fail(err => {
      console.log(err);
    });
}

// update task
$(document).on('click', '.task-update', function () {
  $('#taskModalLabel').html('Update Task');

  $('#task-name').val('');
  $('#task-description').val('');
  $('#task-status').val('');
  $('#task-date').val('');

  $('#update').show();
  $('#save').hide();

  let taskId = $(this).data('id');

  $.ajax({
    method: 'get',
    url: baseUrl + '/tasks/' + taskId,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(task => {
      let date = convertDate(task.due_date);
      $('#task-name').val(task.name);
      $('#task-description').val(task.description);
      $('#task-status').val(task.status);
      $('#task-date').val(date);
      $('#update').click(function () {
        $('#taskModal').modal('toggle');
        $.ajax({
          method: 'patch',
          url: baseUrl + '/tasks/' + taskId,
          data: {
            name: $('#task-name').val(),
            description: $('#task-description').val(),
            status: $('#task-status').val(),
            due_date: $('#task-date').val(),
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .done(response => {
            $('#list-tasks').empty();
            let task = response.task
            let date = convertDate(task.due_date);
            $('#list-tasks').append(`
            <div class="col-md-4">
            <div class="card mb-4">
            <div class="card-body d-flex flex-column">
            <p id="status" class="card-text"><i>${task.status}</i></p>
            <h4 class="card-title align-self-center"><b>${task.name}</b></h4>
            <p class="card-text align-self-center">${task.description}</p>
            <p class="card-text align-self-end">${date}</p>
            <div class="align-self-end">
            <a href="" class="btn btn-default btn-sm task-update" data-toggle="modal" data-target="#taskModal" data-id="${task._id}"><i class="fas fa-edit"></i>
            </a>
            <a href="" id="delete-task" class="btn btn-danger btn-sm task-delete" data-id="${task._id}"><i class="fas fa-times"></i>
            </a>
            </div>
            </div>
            </div>
            </div>
            `);
            findTasks();
            Swal.fire({
              type: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500
            });
            $('#task-name').val('');
            $('#task-description').val('');
            $('#task-status').val('');
            $('#task-date').val('');
          })
          .fail(err => {
            console.log(err);
          });
      });
    })
    .fail(err => {
      console.log(err);
    });
});

$(document).on('click', '.task-delete', function () {
  event.preventDefault();
  let taskId = $(this).data('id');
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
    .then((result) => {
      if (result.value) {
        $.ajax({
          method: 'delete',
          url: baseUrl + '/tasks/' + taskId,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .done((response) => {
            $(this).parentsUntil('#list-tasks').remove();
            Swal.fire(
              'Deleted!',
              response.message,
              'success'
            );
          })
          .fail(err => {
            console.log(err);
          });
      }
    });
});

function addOnChange() {
  $('#taskModalLabel').html('Add Task');
  $('#task-name').val('');
  $('#task-description').val('');
  $('#task-status').val('');
  $('#task-date').val('');
  $('#update').hide();
  $('#save').show();
}

function convertDate(val) {

  let date = new Date(val);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  return `${day}/${month}/${year}`;

}
