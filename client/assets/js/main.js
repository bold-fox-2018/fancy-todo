$(document).ready(function () {
    let button = `<button class="waves-effect red btn-flat" onclick="signInForm()">LOGIN</button>`
    $('.button-login-logout').html(button)
    let html = `
    <br><br>
    <div class="row">
        <div class="col s4"></div>
        <div class="col s4 greeting-message">
            <h3>Hi, welcome to Fancy Todo!</h3>
            <h4>Assisting you is our pleasure :)<h4>
            <button class="btn-flat waves-effect orange btn-large" onclick="signInForm()">Let's get started</button>
        </div>
        <div class="col s4"></div>
    </div>`

    $('#main').html(html)
})

function signInForm() {
    let html = `
    <br><br>
    <div class="row">
    <form class="col s12" id="form-signin">
    <div class="col s4"></div>
    <div class="col s4 sign-in">
    <div class="row">
      <div class="input-field col s12">
        <input id="email" type="email" class="validate">
        <label for="email">Email</label>
      </div>
    </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
          <div class="input-field col s6">
            <button class="waves-effect red btn-small" type="submit" onclick="signIn()">SUBMIT</button>
          </div>
          <div class="input-field col s6">
          <button class="waves-effect btn-flat" onclick="signUpForm()">Don't have an account?</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col s4"></div>
    </form>
  </div>`

    $('#main').html(html)
    $('#form-signin').submit(function (event) {
        event.preventDefault()
    })
}

function signIn() {
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/users/signin`,
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
        .done(response => {
            localStorage.setItem('token', response.token)
            let html = `<button class="waves-effect red btn-flat button-logout" onclick="signOut()">LOGOUT</button>`
            $('.login-google').hide()
            $('.button-login-logout').html(html)
            $('#main').empty()
            $('#user-name').html(`Welcome, ${response.name}`)
            Swal.fire({
                position: 'top',
                type: 'success',
                title: 'Successfully Logged In',
                showConfirmButton: false,
                timer: 1500
            })
            showTodo(response.id)
        })
        .fail(err => {
            console.log(err);
            Swal.fire({
                position: 'top',
                type: 'warning',
                title: 'Wrong email/password',
                showConfirmButton: false,
                timer: 1500
            })
        })
}

function signUpForm() {
    let html = `
        <br><br>
        <div class="row">
        <form class="col s12" id="form-signup">
        <div class="col s4"></div>
        <div class="col s4 sign-up">
        <div class="row">
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate">
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
              <div class="input-field col s6">
                <button class="waves-effect red btn-small" type="submit" onclick="signUp()">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col s4"></div>
        </form>
      </div>`

    $('#main').html(html)
    $('#form-signup').submit(function (event) {
        event.preventDefault()
    })
}

function signUp() {
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/users`,
        data: {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            source: 'application'
        }
    })
        .done(response => {
            signInForm()
        })
        .fail(err => {
            console.log(err);

        })
}


function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/users/google`,
        data: {
            id_token: id_token
        }
    })
        .done(response => {
            // console.log(response.id);

            localStorage.setItem('token', response.token)
            let html = `<button class="waves-effect red btn-flat button-logout" onclick="signOut()">LOGOUT</button>`
            $('.login-google').hide()
            $('.button-login-logout').html(html)
            $('#user-name').html(`Welcome, ${response.data.name}`)
            Swal.fire({
                position: 'top',
                type: 'success',
                title: 'Successfully Logged In',
                showConfirmButton: false,
                timer: 1500
            })
            showTodo(response.id)
        })
        .fail(err => {
            console.log(err);
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
    $('.login-google').show()
    let html = `<button class="waves-effect red btn-flat" onclick="signIn()">LOGIN</button>`
    $('.button-login-logout').html(html)
    $('#user-name').empty()
    Swal.fire({
        position: 'top',
        type: 'success',
        title: 'Successfully Logged Out',
        showConfirmButton: false,
        timer: 1500
    })
    setTimeout(function () {
        window.location.reload(1);
    }, 1500);
}

function showTodo(id) {
    if (localStorage.getItem('token') == undefined) {
        Swal.fire({
            position: 'top',
            type: 'warning',
            title: 'Please sign in with your account',
            showConfirmButton: false,
            timer: 1500
        })
    }

    let html = ``
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos?search=${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            if (response.message !== undefined) {
                let message = response.message.split('.')
                html += `
                <div class="row">
                  <div class="col s4"></div>
                  <div class="col s4">
                    <br><br>
                    <h4>${message[0]}</h4>
                    <h5>${message[1]} here   
                    <button onclick="todoForm('${id}')" class="btn-floating btn-small waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </button>
                    </h5>
                  </div>
                  <div class="col s4"></div>
                </div>`
            } else {
                html += `
                <br><br>
                <div class="add-todo">
                    <h4>Add new Todo    
                    <button onclick="todoForm('${id}')" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </button></h4>
                </div>
                <br><br><br><br>

                <div class="row todo-list todo-header">
                    <div class="col s2">
                        <h5><b>Name</b></h5>
                    </div>
                    <div class="col s2">
                        <h5><b>Description</b></h5>
                    </div>
                    <div class="col s2">
                        <h5><b>Due Date</b></h5>
                    </div>
                    <div class="col s2">
                        <h5><b>Status</b></h5>
                    </div>
                    <div class="col s2">
                        <h5><b>Mark as Completed</b></h5>
                    </div>
                    <div class="col s2">
                        <h5><b>Actions</b></h5>
                    </div>
                </div>                
                `
                response.forEach(data => {
                    html += `
                    <div class="row todo-list">
                        <div class="col s2">
                            <h5>${data.name}</h5>
                        </div>
                        <div class="col s2">
                            <h5>${data.description}</h5>
                        </div>
                        <div class="col s2">
                            <h5>${data.due_date.slice(0, 10)}</h5>
                        </div>
                        <div class="col s2">
                            <h5>${data.status}</h5>
                        </div>`
                    if (data.status == 'completed') {
                        html += `
                            <div class="col s2">
                                <div class="switch">
                                <br>
                                    <label>
                                        <input disabled type="checkbox" onclick="markCompleted('${data._id}')">
                                        <span class="lever"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="col s2">
                                <div class="row">
                                    <div class="col s6">
                                        <button disabled class="waves-effect yellow waves-light btn-large" style="color:black">
                                            update
                                        </button>
                                    </div>
                                    <div class="col s6">
                                        <button class="waves-effect yellow waves-light btn-large" style="color:black" onclick="deleteTodo('${data._id}')">
                                            delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    } else {
                        html += `
                            <div class="col s2">
                                <div class="switch">
                                <br>
                                    <label>
                                        <input type="checkbox" onclick="markCompleted('${data._id}')">
                                        <span class="lever"></span>
                                        
                                    </label>
                                </div>
                            </div>
                            <div class="col s2">
                                <div class="row">
                                    <div class="col s6">
                                        <button class="waves-effect yellow waves-light btn-large" style="color:black" onclick="showUpdateTodo('${data._id}')">
                                            update
                                        </button>
                                    </div>
                                    <div class="col s6">
                                        <button class="waves-effect yellow waves-light btn-large" style="color:black" onclick="deleteTodo('${data._id}')">
                                            delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    }

                })
            }
            $('#main').empty()
            $('#main').html(html)
        })
        .fail(err => {
            console.log(err);
            Swal.fire({
                position: 'top',
                type: 'warning',
                title: `Oops.. it seems like you are a stranger to us.`,
                showConfirmButton: false,
                timer: 1500
            })
        })
}


function todoForm(id) {
    let html = `
    <br><br>
    <div class="row">
        <form class="col s12" id="todo-form">
            <div class="col s4"></div>
            <div class="col s4 todo-form">
                <h4>New Todo</h5>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="todo-name" type="text">
                        <label for="name">Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="description" type="text">
                        <label for="description">Description</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="due date">Due Date</label><br><br>
                        <input id="due-date" type="date">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <button class="waves-effect red btn-small" type="submit" onclick="submitTodo('${id}')">SUBMIT</button>
                    </div>
                </div>
            </div>
            <div class="col s4"></div>
        </form>
    </div>`

    $('#main').empty()
    $('#main').html(html)

    $('#todo-form').submit(function (event) {
        event.preventDefault()
    })
}

function submitTodo(id) {
    if (localStorage.getItem('token') == null) {
        Swal.fire({
            position: 'top',
            type: 'warning',
            title: 'Please sign in with your account',
            showConfirmButton: false,
            timer: 1500
        })
    }

    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/todos`,
        data: {
            name: $('#todo-name').val(),
            description: $('#description').val(),
            due_date: $('#due-date').val(),
            user_id: `${id}`
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            showTodo(id)
        })
        .fail(err => {
            console.log(err);
            Swal.fire({
                position: 'top',
                type: 'warning',
                title: `Oops.. it seems like you are a stranger to us.`,
                showConfirmButton: false,
                timer: 1500
            })
        })
}

function markCompleted(id) {
    if (localStorage.getItem('token') == null) {
        Swal.fire({
            position: 'top',
            type: 'warning',
            title: 'Please sign in with your account',
            showConfirmButton: false,
            timer: 1500
        })
    }

    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        data: {
            status: 'completed'
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            showTodo(response.user_id)
        })
        .fail(err => {
            console.log(err);
            Swal.fire({
                position: 'top',
                type: 'warning',
                title: `Oops.. it seems like you are a stranger to us.`,
                showConfirmButton: false,
                timer: 1500
            })
        })
}

function showUpdateTodo(id) {
    if (localStorage.getItem('token') == null) {
        Swal.fire({
            position: 'top',
            type: 'warning',
            title: 'Please sign in with your account',
            showConfirmButton: false,
            timer: 1500
        })
    }

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            console.log(response);
            let html = `
            <br><br>
            <div class="row">
                <form class="col s12" id="todo-form">
                    <div class="col s4"></div>
                    <div class="col s4 todo-form">
                        <h4>Update Todo</h5>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="todo-name-update" type="text" value="${response.name}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="description-update" type="text" value="${response.description}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <label for="due date">Due Date</label><br><br>
                                <input id="due-date-update" type="date" value="${response.due_date.slice(0, 10)}">
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <button class="waves-effect red btn-small" type="submit" onclick="updateTodo('${id}')">UPDATE</button>
                            </div>
                        </div>
                    </div>
                    <div class="col s4"></div>
                </form>
            </div>`
            $('#main').empty()
            $('#main').html(html)

            $('#todo-form').submit(function (event) {
                event.preventDefault()
            })
        })
        .fail(err => {
            console.log(err);
            Swal.fire({
                position: 'top',
                type: 'warning',
                title: `Oops.. it seems like you are a stranger to us.`,
                showConfirmButton: false,
                timer: 1500
            })

        })
}

function updateTodo(id) {
    if (localStorage.getItem('token') == null) {
        Swal.fire({
            position: 'top',
            type: 'warning',
            title: 'Please sign in with your account',
            showConfirmButton: false,
            timer: 1500
        })
    }

    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        data: {
            name: $('#todo-name-update').val(),
            description: $('#description-update').val(),
            due_date: $('#due-date-update').val()
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            showTodo(response.user_id)
        })
        .fail(err => {
            console.log(err);
            Swal.fire({
                position: 'top',
                type: 'warning',
                title: `Oops.. it seems like you are a stranger to us.`,
                showConfirmButton: false,
                timer: 1500
            })

        })
}

function deleteTodo(id) {
    if (localStorage.getItem('token') == null) {
        Swal.fire({
            position: 'top',
            type: 'warning',
            title: 'Please sign in with your account',
            showConfirmButton: false,
            timer: 1500
        })
    }

    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(response => {
            showTodo(response.user_id)
        })
        .fail(response => {
            console.log(err);
            Swal.fire({
                position: 'top',
                type: 'warning',
                title: `Oops.. it seems like you are a stranger to us.`,
                showConfirmButton: false,
                timer: 1500
            })
        })
}