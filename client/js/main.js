const baseURL = 'http://localhost:3000';

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token);

    // console.log(id_token);
    $('.profile').html(`<div class="namaUser">${profile.getName()}</div>`)
    $('.profile').append(`<div class="gambarUser"><img src="${profile.getImageUrl()}"></div>`)

    $.ajax({
            url: `${baseURL}/api/user/login`,
            method: 'POST',
            data: {
                id_token: id_token,
                loginVia: 'google'
            }
        })
        .done(function (data) {
            // console.log(data);

            localStorage.setItem('token', data.token);
            isLogin(true);

        })
        .fail(error => {
            console.log(error)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token');
        console.log('User signed out.');
        isLogin(false)
        $('#register_form').show()
        $('.profile').hide()
        $('#login').show()
        $('#login').show()

    });
}