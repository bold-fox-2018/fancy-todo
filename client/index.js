
let monthsInAyear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let personalData = {}
let currentUser = {}
let accessToken = null

check()


function clean() {
    $('#project-form').empty()
    $('#todo-form').empty()
    $('#todo-project-form').empty()
    $('#manual-signup').hide()
    $("#todo-form").empty()
    $("#signup-form").empty()
    $("#sidenav").hide()
    $('#navbar').hide()
    $('#login-form').hide()
    $('#project-page').empty()
    $('#main-page').empty()
    $('#todo-header').empty()
    $('#todo-project-header').empty()
    $('#project-todo-list').empty()
    $('#project-page').empty()
    $('#add-member').empty()
    $('#project-detail').empty()
}

function check() {
    if (localStorage.getItem('token') != null) {
        console.log('masuk sini');
        
        $.post('http://localhost:3000/verify', { token: localStorage.getItem('token') })
            .done(response => {
                personalData = response.data
                return $.get(`http://localhost:3000/fancytodo/${personalData.email}`)
                    .done(response => {
                        currentUser = response
                        response.todoList.sort(function (a, b) {
                            var dateA = new Date(a.dueDate) 
                            var dateB = new Date(b.dueDate)
                            if (dateA < dateB) {
                                return -1;
                            }
                            if (dateA > dateB) {
                                return 1;
                            }
                            return 0;
                        })

                        clean()
                        $("#sidenav").show()
                        $('#navbar').show()
                        $('#todo-header').append(`<h3>your todo lists</h3>`)
                        response.todoList.forEach(list => {
                            let date = new Date(list.dueDate).getDate()
                            let month = monthsInAyear[new Date(list.dueDate).getMonth()]
                            let html = ''
                            if (list.status == 'complete') {
                                html += `
                                <div class="col-sm-4 col-md-3 my-2">
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-header" style="background-color: #00AA9E;">
                                             <p style="font-size:35px" id="card-font">${month}</p>
                                         </div>
                                         <div class="card-header">
                                            <p style="font-size:20px" id="card-font">${date}</p>
                                        </div>
                                            <div class="card-body" style="width:90%">   
                                                <p>task : ${list.name}</p>
                                                <p>description : ${list.description}</p>
                                                <p>status : ${list.status}</p>                    
                                                <a href="#" class="btn btn-primary" onClick ="deleteTodo('${list._id}')"><i class="fas fa-trash-alt"></i></a>
                                            </div>
                                       </div>
                                </div>
                                `
                            } else {
                                html += `
                                <div class="col-sm-4 col-md-3 my-2">
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-header" style="background-color: #94bcfc;">
                                             <p style="font-size:35px" id="card-font" >${month}</p>
                                         </div>
                                         <div class="card-header">
                                            <p style="font-size:20px"n id="card-font">${date}</p>
                                        </div>
                                            <div class="card-body" style="width:90%">   
                                                <p>task : ${list.name}</p>
                                                <p>descripton : ${list.description}</p>
                                                <p>status : ${list.status}</p>                        
                                                <a href="#" class="btn btn-primary" onClick ="updateTodo('${list._id}')"><i class="fas fa-check"></i></a>
                                                <a href="#" class="btn btn-primary" onClick ="deleteTodo('${list._id}')"><i class="fas fa-trash-alt"></i></a>
                                            </div>
                                       </div>
                                </div>
                                `
                            }
                            // $("#sidenav").show()
                            $('#main-page').append(html)
                        })
                    })
            })
            .fail(err => { 
                clean()
                $("#navbar").hide()
                $('#login-form').show()
                $('#manual-signup').show()
            })

    } else {
        console.log('masuk sini');

        clean()
        $("#navbar").hide()
        $('#login-form').show()
        $('#manual-signup').show()
    }
}


$('#login-form').submit(function (event) {
    event.preventDefault()
    $.post('http://localhost:3000/signin', {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()

    })
        .done(response => {
            personalData = response.data
            localStorage.setItem('token', response.token)
            check()
        })
        .fail(err => {
            swal('please check again your email and password')
        })
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    const usertoken = googleUser.getAuthResponse()
    accessToken = usertoken.access_token
    $.post(`http://localhost:3000/login/google`, { id_token })
        .done(response => {
            localStorage.setItem('token', response.token)
            check()
        })
        .fail(err => {
            swal('opps, our server is busy, please try again')
        })

}



function signOut() {

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        check()

    });
}

function signup() {
    $('#login-form').hide()
    $('#manual-signup').hide()
    $('#signup-form').append(` 
    <form id="signup-form">
    <div class="container">
        <div class="form-group">
            <label>First Name:</label>
            <input type="text" class="form-control" id="first_name">
        </div>
        <div class="form-group">
            <label>Last Name:</label>
            <input type="text" class="form-control" id="last_name">
        </div>
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" id="email">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form> `)
}

$("#signup-form").submit(function (event) {
    event.preventDefault
    $.post(`http://localhost:3000/fancytodo`, {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        email: $('#email').val(),
        password: $('#pwd').val()
    })
        .done(response => {
            $('#signup-form').empty()
            check()
        })
        .fail(response => {
            swal('opps field cannot be blank')
        })
})

function todoform() {
    clean()
    $('#sidenav').show()
    $('#navbar').show()

    $('#todo-form').append(`<form id="todo-form">
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`)
}

$("#todo-form").submit(function (event) {
    event.preventDefault

    $('#loading').append(`  <div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
  </div>`)
    $.ajax({
        url: `http://localhost:3000/fancytodo/todo`,
        headers: {
            "token": localStorage.getItem('token'),
            "Authorization" : accessToken
        },
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val(),
            points: $('#points').val(),
            email: personalData.email,
            owner: 'user'
        },
        method: 'POST'
    })
        .done(response => {
            $('#loading').empty()
            $('#todo-form').empty()
            check()
           
        })
        .fail(err => {
            swal('opps field cannot be blank')
        })
})

function updateTodo(id) {
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/fancytodo/${id}`,
        headers: {
            "token": localStorage.getItem('token')
        },
        data: {
            status: 'complete',
            user : currentUser._id
        }
    })
        .done(response => {
            check()
        })
        .fail(response => {
            swal('internal server error')
        })
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/fancytodo/${id}`,
        headers: {
            "token": localStorage.getItem('token')
        }
    })
        .done(response => {
            swal('todo deleted')
            check()
        })
        .fail(response => {
            swal('internal server error')
        })
}

