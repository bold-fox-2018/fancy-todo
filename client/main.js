$(document).ready(function () {
    navbar();
    isLogin(false)
    googleButton('hide')
})

function navbar() {
    $('#navbar').append(
        `
        <div class="container">
            <a href="#" class="brand-logo">Fancy Todo</a>
            <ul class="right hide-on-med-and-down">
                <li><a id="login-btn"class="btn" onclick="loginForm()">login</a></li>
                <li><a id="logout-btn"class="btn red lighten-0.5"onclick="signOut();">Sign out</a></li>
            </ul>
        </div>
        `
    )
}

function loginForm() {
    $('#home-content').empty()
    $('#form').empty()
    $('#form').append(
        `
        <form id="form-signin"class="col s12" onsubmit="signin()">
        <h3>Login</h3>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">account_circle</i>
                        <input id="username" type="text" class="validate"  placeholder="username">
                        <label for="username"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">lock</i>
                        <input id="password" type="text" class="validate" placeholder="password">
                        <label for="password"></label>
                    </div>
                </div>
            </div>
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign In</button>
            <ul id="alternative_login">
                <li><a href="#" id="register-btn"class="btn"onclick="register();">register</a></li>
            </ul>
        </form>
        `
    )
    googleButton('show')
    $('#form-signin').on('submit', function (event) {
        event.preventDefault()
    })
    console.log("masokkkkkkkkkkkkkkkkkkk")
}

function googleButton(action) {
    if (action === 'show') {
        $('#googleButton').show()
    } else {
        $('#googleButton').hide()
    }
}

function signin() {
    $.ajax({
        url: "http://localhost:3000/users/login",
        method: "POST",
        data: {
            username: $('#username').val(),
            password: $('#password').val(),
            method: "websiteLogin"
        }
    })
        .done(res => {
            localStorage.setItem('token', res.token);
            isLogin(true)
            console.log('login success=============================')
            console.log(res.userId)
            userHome(res.userId)
            successAlert('login success!')
        })
        .fail(err => {
            failLogin()
            console.log(err)
        })
    console.log("masok signin===================")
}

function successAlert(msg) {
    swal({
        icon: 'success',
        text: msg
    })
}

function failLogin() {
    swal({
        icon: 'error',
        text: 'username/password wrong'
    })
}

function userHome(userId) {
    console.log(userId, 'dalem userHome=========')
    $.ajax({
        url: `http://localhost:3000/todos?search=${userId}`,
        method: 'GET'
    })
        .done(res => {
            if (res.length == 0) {
                console.log('kosong bosque')
                todoEmpty(userId)
                googleButton('hide')
            } else {
                readTodo(userId)
                console.log("masok elseeeeeeeeeeeee")
            }
            // console.log(res.length, 'ini hasil todo =====================')
        })
        .fail(err => {
            console.log(err)
        })
}

function todoEmpty(userId) {
    console.log('masok todooooooooooooooEmptyyyyyyyyyyyyy')
    $('#form-signin').hide()
    $('#home-content').empty()
    $('#home-content').append(
        `
        <form id="form-addTodo"class="col s12" onsubmit="addTodoServer()">
        <h6>your todo list is empty, add new todo now?</h6>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">tag</i>
                        <input id="name" type="text" class="validate"  placeholder="name">
                        <label for="name"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">note</i>
                        <input id="description" type="text" class="validate" placeholder="description">
                        <label for="description"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">date</i>
                        <input id="date"type="date" class="datepicker">
                    </div>
                </div>
            </div>

            <input id="userId" value="${userId}" type="text" class="validate"  placeholder="name" hidden>
            
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">add</button>
        </form>
        `
    )
    $('#form-addTodo').on('submit', function (event) {
        event.preventDefault()
    })
}

function addTodoServer() {

    console.log($('#name').val(), '==============')
    console.log($('#description').val(), '==============')
    console.log($('#date').val(), '==============')
    console.log($('#userId').val(), '==============')

    $.ajax({
        url: 'http://localhost:3000/todos/',
        method: 'POST',
        data: {
            userId: $('#userId').val(),
            name: $('#name').val(),
            description: $('#description').val(),
            due_date: $('#date').val()
        }
    })
        .done(todoCreated => {
            readTodo($('#userId').val())
        })
        .fail(err => {
            console.log(err)
        })
}

function readTodo(userId) {
    googleButton('hide')
    $('#home-content').empty()
    $('#form-addTodo').hide()
    $('#form-signin').hide()
    console.log('masok read todo bosqueeeeeeeeeeeeee', userId)
    $.ajax({
        url: `http://localhost:3000/todos?search=${userId}`,
        method: 'GET'
    })
        .done(res => {
            showAllTodo(res, userId)
        })
        .fail(err => {
            console.log(err)
        })
}

function addTodo(userId) {

    console.log('masokkkkkkkkkkkkkkk add todo yaaaaaaaaa')
    console.log(userId, 'masokk add todo bosqueeeeeeeeeeeeee')

    $('#form-signin').hide()
    $('#home-content').empty()
    $('#home-content').append(
        `
        <form id="form-addTodo"class="col s12" onsubmit="addTodoServer()">
        <h6>add new todo now?</h6>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">tag</i>
                        <input id="name" type="text" class="validate"  placeholder="name">
                        <label for="name"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">note</i>
                        <input id="description" type="text" class="validate" placeholder="description">
                        <label for="description"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">date</i>
                        <input id="date"type="date" class="datepicker">
                    </div>
                </div>
            </div>

            <input id="userId" value="${userId}" type="text" class="validate"  placeholder="name" hidden>
            
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">add</button>
        </form>
        `
    )
    $('#form-addTodo').on('submit', function (event) {
        event.preventDefault()
    })
}

function showAllTodo(allTodo, userId) {
    let id = userId
    $('#home-content').append(`
        <btn onclick="addTodo('${id}')"class="btn-floating blue pulse">
            <i class="material-icons">add</i>
        </btn>
    `)
    allTodo.map(e => {
        console.log(e.status, 'ini status nya bosssssssssssssssss')
        let status = ''
        if (e.status == 'false') {
            status = '<i class="material-icons prefix medium">clear</i>'
        } else if (e.status == 'true') {
            status = '<i class="material-icons prefix medium">check</i>'
        }
        $('#home-content').append(
            `
            <div class="row">
            <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">${e.name}</span>
                        <p>Description: ${e.description}</p>
                        <p>Due: ${e.due_date}</p>
                        ${status}
                    </div>
                    <div class="card-action">
                        <btn onclick="findOneTodo('${e._id}')"><a href="#">update</a></btn>
                        <btn onclick="deleteTodo('${e._id}','${id}')"><a href="#">delete</a></btn>
                    </div>
                </div>
            </div>
            </div>
            `
        )
    })
    console.log(allTodo, 'ini smua todonya bosssssssssssssssss')
}

function deleteTodo(todoId, userId) {
    $.ajax({
        url: `http://localhost:3000/todos/?id=${todoId}`,
        method: "DELETE",
    })
        .done(deleted => {
            readTodo(userId)
            successAlert('success deleted todo!')
        })
        .fail(err => {
            console.log(err)
        })
}

function findOneTodo(todoId) {
    console.log(todoId)
    $.ajax({
        url: `http://localhost:3000/todos/findOne?id=${todoId}`,
        method: "GET"
    })
        .done(dataFound => {
            updateForm(dataFound)
        })
        .fail(err => {
            console.log(err)
        })
}

function updateForm(todoData) {
    console.log(todoData.userId, 'mulai masok update form bosssssssssssssssssss')


    let date = todoData.due_date
    let split = date.split("-")
    let finalDate = []
    let index = split.length - 1
    while (index >= 0) {
        finalDate.push(split[index])
        index--
    }
    finalDate = finalDate.join('-')

    let checkbox = ''

    if (todoData.status === 'true') {
        checkbox = 'checked'
    }

    $("#home-content").empty()
    $("#home-content").append(`
    <form id="form-updateTodo"class="col s12" onsubmit="updateTodoServer('${todoData._id}')">
        <h6>done with your todo? update it!</h6>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">tag</i>
                        <input id="name" type="text" class="validate"  value="${todoData.name}">
                        <label for="name"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">note</i>
                        <input id="description" type="text" class="validate" value="${todoData.description}">
                        <label for="description"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">date</i>
                        <input id="date"type="date" class="datepicker" value="${finalDate}">
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="row">
                    <div class="input-field col s6"> 
                        <div class="switch">
                            <label>
                                Off
                                <input id="status" value="false" onclick="value='true'"type="checkbox">
                                <span class="lever"></span>
                                On
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <input id="userId" value="${todoData.userId}" type="text" hidden>

            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">update</button>
        </form>
    `)
    $('#form-updateTodo').on('submit', function (event) {
        event.preventDefault()
    })
}

function updateTodoServer(todoId) {
    console.log(todoId)
    console.log($('#name').val())
    console.log($('#description').val())
    console.log($('#date').val())
    console.log($('#status').val())
    console.log($('#userId').val())
    let status = 'false'
    if ($('#status').val() === 'true') {
        status = 'true'
    }

    $.ajax({
        url: `http://localhost:3000/todos/?id=${todoId}`,
        method: "PUT",
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            due_date: $('#date').val(),
            status: status
        }
    })
        .done(updatedSuccess => {
            readTodo($('#userId').val())
            successAlert('success updated todo!')

        })
        .fail(err => {
            console.log(err)
        })

    // console.log('masok updateTodoServer pakkkkkkkkkkk')
}

function isLogin(bool) {
    console.log(bool)
    if (bool === false) {

        $('#login-btn').show()
        $('#logout-btn').hide()
        $('#register-btn').show()
        homeBeforeLogin()

    } else {
        $('#logout-btn').show()
        $('#login-btn').hide()
        $('#register-btn').hide()
        //!! KALO USER BERHASIL LOGIN, SHOW ALL TODO OF USER 
    }
}

function homeBeforeLogin() {
    $('#googleButton').hide()
    $('#home-content').append(
        `
        <div class="container center">
            <h1>Welcome to Fancy Todo!</h1>
            
        </div>
        `
    )
}

function register() {
    $('#form-signin').hide()
    googleButton('hide')
    $('#form').append(
        `
        <form id="form-register"class="col s12" onsubmit="createNewUser()">
        <h3>Register</h3>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">account_circle</i>
                        <input id="new-username" type="text" class="validate"  placeholder="username">
                        <label for="new-username"></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">mail</i>
                        <input id="new-email" type="text" class="validate" placeholder="email">
                        <label for="new-email   "></label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">lock</i>
                        <input id="new-password" type="text" class="validate" placeholder="password">
                        <label for="new-password"></label>
                    </div>
                </div>
            </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Submit</button>

        </form>
        `
    )
    $('#form-register').on('submit', function (event) {
        event.preventDefault()
    })
}

function createNewUser() {
    console.log($('#new-username').val())
    console.log('masok create new user pak ekoooooooooooooooooooooooo')
    $.ajax({
        url: 'http://localhost:3000/users/register',
        method: 'POST',
        data: {
            username: $('#new-username').val(),
            email: $('#new-email').val(),
            password: $('#new-password').val()
        }
    })
        .done(userCreated => {
            console.log('new user created!!')
            $('#form-register').hide()
            $('#form-signin').show()
        })
        .fail(err => {
            console.log(err)
        })
}

function signOut() {
    $('#form-signin').empty()
    $('#home-content').empty()
    localStorage.removeItem('token');
    isLogin(false)
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    sendTokenToBackEnd(id_token)
}

function sendTokenToBackEnd(id_token) {
    $.ajax({
        url: 'http://localhost:3000/users/login',
        method: 'POST',
        data: {
            id_token: id_token,
            method: 'google',
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token)
            isLogin(true)
            userHome(data.userId)
            console.log(data, 'ini temen baru google broooooooooooo')
            
        })
        .fail(err => {
            console.log(err)
        })
}