$(document).ready(function () { 
    

    $('#hello').show()
    $('#login').hide()
    $('#register_form').hide()
    $('#sign_out').hide()

    $('#login_click').click(function() {
        $('#login').show()
        $('#register_form').hide()
        $('#google_signin').show()
        $('#hello').hide()
    })

    $('#login').submit(function() {
        event.preventDefault()
    })

    $('#register_click').click(function() {
        $('#register_form').show()
        $('#login').hide()
        $('#hello').hide()
    })

    $('#register_form').submit(function() {
        event.preventDefault()

    })

    $('#sign_in').click(function() {
        $('#register_form').hide()
        $('#login').show()
        $('#google_signin').show()
    })
    $('#register_').click(function() {
        $('#register_form').show()
        $('#login').hide()
        $('#google_signin').hide()
    })
})

function login() {
    $.ajax({
        url: 'http://localhost:4000/users/login',
        method: 'POST',
        data: {
            email: $('#email').val(),
            password: $('#pw').val(),
            loginVia: 'website'
        }
    })
    .done(data => {
        localStorage.setItem('token', data.token)
        isLogin(true)
    })
    .fail(err => {
        console.log(err)
    })
}

function register() {
    console.log("Masuk ke registrasi")
    console.log($('#reg_email').val())
    console.log($('#pwd').val())
    $.ajax({
        url: 'http://localhost:4000/users/register',
        method: 'POST',
        data: {
            email: $('#reg_email').val(),
            password: $('#pwd').val()
        }
    })
    .done(data => {
        $('#register_form').hide()
        $('#login').show()
    })
    .fail(err => {
        console.log(err)
    }) 
}

