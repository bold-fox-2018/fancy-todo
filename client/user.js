$(document).ready(function() {
    if (localStorage.getItem('token')) {
        $('.classTodo').show()
        $('.addTodo').show()
        $('.updateTodo').show()
        $('.user').hide()
        $('.logout').show()
        $('.google').hide()
        $('#updateTodo').hide()
    } else {
        $('.classTodo').hide()
        $('.addTodo').hide()
        $('.updateTodo').hide()
        $('.user').show()
        $('.google').show()
        $('.logout').hide()
    }
    $('#register').submit(function(event) {
        console.log('aaaaaaaaaaaaaaaaaa')
        event.preventDefault()
            // if ($('#password').val() === $('#repassword').val()) {
        $.ajax({
                url: 'http://localhost:3000/fancyTodo/user/register',
                method: 'POST',
                data: {
                    email: $('#email').val(),
                    password: $('#password').val()
                }
            })
            .done(function(user) {
                console.log(user)
            })
            .fail(function(err) {
                console.log(err)
            })
            // } else {
            //     console.log('confirm password salah')
            // }
    })

    $('#login').submit(function(event) {

        event.preventDefault()
            // if ($('#password').val() === $('#repassword').val()) {
        $.ajax({
                url: 'http://localhost:3000/fancyTodo/user/login',
                method: 'POST',
                data: {
                    email: $('#emailLogin').val(),
                    password: $('#passwordLogin').val()
                }
            })
            .done(function(user) {
                // console.log(user)
                localStorage.setItem('token', user)
                    // $('.user').hide()
                    // $('.g-signin2').hide()
                    // $('.todo').show()
            })
            .fail(function(err) {
                // console.log('aaaaaaaaaaaaaaaaaa')
                console.log(err)
            })
            // } else {
            //     console.log('confirm password salah')
            // }
    })
})