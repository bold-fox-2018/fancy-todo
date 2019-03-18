$(document).ready(function(){
    $('#register').submit(function(event){
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/fancy-todo/user/signup',
            method: 'POST',
            data: {
                email: $('#email').val(),
                password: $('#password').val() 
            }
        })
        .done(newuser=>{
            // console.log(newuser)
            if (newuser) {
                $('#register').hide()
            }
        })
        .fail(err=>{
            console.log(err)
        })
    })

    $('#login').submit(function(event){
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/fancy-todo/user/signin',
            method: 'POST',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            }
        })
        .done(data=>{
            // console.log(data)
            if (data) {
                localStorage.setItem('accesToken', data.token)
                $('#login').hide()
                $('#register').hide()
                // $('header').html('<a href="" class="signout" onclick="signout()">Logout</a>')
            }
        })
        .fail(err=>{
            console.log(err)
        })
    })
})

