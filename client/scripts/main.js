$(document).ready(function() {
    getProfile()
})


// =========================================================================
// =========================================================================
// USER SECTION

function mainMenu() {
    $('#register').hide()
    $('#register p')[0].innerHTML = ``
    $('#profile-container p')[0].innerHTML = ``
    $('#newTodo').hide()
    if(localStorage.token) {
        $('#todoList').show()
    }
}

function register() {
    $('#register').show()
}

function signUp() {
    $.ajax({
        url: 'http://localhost:3000/user/signUp',
        method: 'POST',
        data: {
            name: $('#register input')[0].value,
            email: $('#register input')[1].value,
            password: $('#register input')[2].value
        }
    })
    .done(result => {
        $('#register').hide()
        console.log(result)
    })
    .fail(err => {
        $('#register p')[0].innerHTML = err.responseText
        console.error(err)
    })
}

function googleSignIn(googleUser) {
    if(!localStorage.token) {
        const id_token = googleUser.getAuthResponse().id_token
        $.ajax({
            url: 'http://localhost:3000/user/googleSignIn',
            method: 'POST',
            data: {
                idToken: id_token
            }
        })
        .done(data => {
            localStorage.setItem('token', data.token)
            getProfile()
        })
        .fail(err => {
            console.error(err)
        })
    }
}

function signIn() {
    $.ajax({
        url: 'http://localhost:3000/user/signIn',
        method: 'POST',
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        getProfile()
    })
    .fail(err => {
        $('#profile-container p')[0].innerHTML = err.responseText
        console.error(err)
    })
}

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance()
    if(auth2.isSignedIn.Ab) {
        auth2.signOut()
        .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            afterSignOut()
        })
        .catch(err => {
            console.error(err)
        })
    } else {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        afterSignOut()
    }
}

function afterSignIn(data) {
    $('#login').hide()
    $('#signout-button').show()
    $('#user-info')[0].innerHTML = `Hello, ${data.email}`
    $('#todoList').show()
    $('#register').hide()
    $('#register p')[0].innerHTML = ``
    $('#profile-container p')[0].innerHTML = ``
}

function afterSignOut() {
    $('#login').show()
    $('#normal-signin input')[0].value = ''
    $('#normal-signin input')[1].value = ''
    $('#signout-button').hide()
    $('#user-info')[0].innerHTML = ``
    $('#todoList table').empty()
    $('#todoList').hide()
}

function getProfile() {
    if(localStorage.token) {
        $.ajax({
            url: 'http://localhost:3000/user/tokenProfile',
            method: 'GET',
            headers: {
                token: localStorage.token
            }
        })
        .done(data => {
            afterSignIn(data)
            todoList(data.email)
        })
        .fail(err => {
            console.error(err)
        })
    }
}

// =========================================================================
// =========================================================================
// TODO SECTION

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function todoList(email) {
    $.ajax({
        url: 'http://localhost:3000/todo/list',
        method: 'GET',
        headers: {
            email,
            token: localStorage.token
        }
    })
    .done(todos => {
        if(todos.message) {
            $('#todoList table').html(`<thead><td>${todos.message}</td></thead>`)
        } else {
            todos.reverse()
            let html = `<thead>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Status</td>
                            <td>Due Date</td>
                            <td>Video Reference</td>
                            <td>Options</td>
                        </thead>`
            for(let i = 0; i < todos.length; i++) {
                todos[i].due_date = new Date(todos[i].due_date)
                html += `<tr id="todo_${i + 1}">
                            <td>${i + 1} <p style="display: none;">${todos[i]._id.toString()}</p></td>
                            <td>${todos[i].name}</td>
                            <td>${todos[i].description}</td>
                            <td>${todos[i].status}</td>
                            <td>${todos[i].due_date.getDate()} ${months[todos[i].due_date.getMonth()]} ${todos[i].due_date.getFullYear()} ${todos[i].due_date.getHours() < 10 ? `0${todos[i].due_date.getHours()}` : todos[i].due_date.getHours()}:${todos[i].due_date.getMinutes() < 10 ? `0${todos[i].due_date.getMinutes()}` : todos[i].due_date.getMinutes()}</td>
                            <td id="video_${i + 1}"></td>
                            <td><a href="#" onclick="showUpdateTodo(${i + 1})">Update</a> | <a href="#" onclick="deleteTodo(${i + 1})">Delete</a></td>
                         </tr>`
            }
            $('#todoList table').html(html)
            for(let i = 0; i < todos.length; i++) {
                youtubeVideo(todos[i].description, videoId => {
                    $(`#video_${i + 1}`)[0].innerHTML = `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">Link</a>`
                })
            }
        }
    })
    .fail(err => {
        console.error(err)
    })
}

function youtubeVideo(description, cb) {
    $.ajax({
        url: 'http://localhost:3000/todo/video',
        method: 'GET',
        headers: {
            description,
            token: localStorage.token
        }
    })
    .done(result => {
        cb(result.items[0].id.videoId)
    })
    .fail(err => {
        console.error(err)
    })
}

function showInputTodo() {
    $('#todoList').hide()
    $('#newTodo').show()
    $('#submitType').html('<input id="submit" type="submit" onclick="newTodo()">')
    $('#newTodo h2').html('New Todo')
}

function newTodo() {
    const data = $('.newTodo')
    $.ajax({
        url: 'http://localhost:3000/todo/new',
        method: 'POST',
        data: {
            name: data[0].value,
            description: data[1].value,
            status: data[2].value,
            due_date: data[3].value,
            userEmail: $('#user-info')[0].innerHTML.slice(7)
        },
        headers: {
            token: localStorage.token
        }
    })
    .done(todo => {
        todoList(todo.userEmail)
        $('#newTodo').hide()
        $('#todoList').show()
    })
    .fail(err => {
        console.error(err)
    })
}

function showUpdateTodo(id) {
    $('.newTodo')[0].value = $(`#todo_${id}`)[0].cells[1].innerHTML
    $('.newTodo')[1].value = $(`#todo_${id}`)[0].cells[2].innerHTML
    $('.newTodo')[2].value = $(`#todo_${id}`)[0].cells[3].innerHTML
    $('.newTodo')[3].value = new Date($(`#todo_${id}`)[0].cells[4].innerHTML).toISOString().slice(0, 16)
    $('#submitType').html(`<input id="submit" type="submit" onclick="updateTodo(${id})">`)
    $('#newTodo h2').html(`Todo Id ${id}`)
    $('#todoList').hide()
    $('#newTodo').show()
}

function updateTodo(id) {
    const newData = $('.newTodo')
    $.ajax({
        url: 'http://localhost:3000/todo/update',
        method: 'PUT',
        data: {
            id: $(`#todo_${id} p`)[0].innerHTML,
            name: newData[0].value,
            description: newData[1].value,
            status: newData[2].value,
            due_date: newData[3].value
        },
        headers: {
            token: localStorage.token
        }
    })
    .done(todo => {
        todoList(todo.userEmail)
        $('#newTodo').hide()
        $('#todoList').show()
    })
    .fail(err => {
        console.error(err)
    })
}

function deleteTodo(id) {
    $.ajax({
        url: 'http://localhost:3000/todo/delete',
        method: 'DELETE',
        data: {
            id: $(`#todo_${id} p`)[0].innerHTML
        },
        headers: {
            token: localStorage.token
        }
    })
    .done(() => {
        console.log('Success')
        todoList()
    })
    .fail(err => {
        console.error(err)
    })
}