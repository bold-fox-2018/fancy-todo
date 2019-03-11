// let link = 'http://localhost:3000'

function onSignIn(googleUser) {
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
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token
        // console.log(id_token)
    $.ajax({
            url: 'http://localhost:3000/fancyTodo/login',
            method: 'POST',
            data: {
                id_token: id_token
            }
        })
        .done(function(token) {
            let html = ''
                // console.log(token)
            localStorage.setItem('token', token)
        })
        .fail(function(err) {
            console.log(err)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        localStorage.removeItem('token')
    });
}