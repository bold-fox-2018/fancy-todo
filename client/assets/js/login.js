// login manual
$('#submit-log').on('click', function() {
    const username = $("#log-username").val()
    const password = $("#log-password").val()
    
    $.ajax({
        url: 'http://localhost:5000/user/login',
        type: 'POST',
        data: {
            username: username,
            password: password
        }
    })
    .done(function(response) {
        localStorage.setItem('token', response.token)
        swal(`Welcome to MY Fancy To-Do, ${response.data.firstName} ${response.data.lastName}`)
        
    })
    .fail(function(err) {
        console.log(err)
    })
})

// google login
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `http://localhost:5000/user/googlelogin`,
        type: 'POST',
        data: {
            id_token: id_token
        }
    })
        .done(response => {
            console.log(response.data.first_name);

            localStorage.setItem('token', response.token)
            swal(`Welcome to My Fancy To do, ${response.data.first_name} ${response.data.last_name}`)
        })
        .fail(err => {
            console.log(err);
        })
}

// logout all
function signOut() {
    localStorage.clear()
    swal('See youu..')
}