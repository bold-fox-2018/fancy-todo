$(document).ready(function () {
    //
    //      C O N F I G
    //
    $('#signout-button, .fa-sign-out').hide();
    //
    //      L O G I N   M A N U A L
    //
    $('#login').click(function () {
        console.log($('#loginEmail').val());
        console.log($('#loginPassword').val());
        $.ajax({
            url: `${myUrl}/users/formSignIn`,
            method: 'POST',
            data: {
                email: $('#loginEmail').val(),
                password: $('#loginPassword').val()
            }
        })
            .done(function (response) {
                localStorage.setItem('token', response.token);
                $('#fa-sign-in').hide();
                $('#signout-button, .fa-sign-out').show();
                $('#fa-list').click();
                console.log('User LogIn');
            })
            .fail(function (err) {
                console.log(err);
            })
    })
})
//
//      L O G I N   G O O G L E
//
function onSignIn(googleUser) {
    let { id_token } = googleUser.getAuthResponse();
    console.log(id_token);
    $.ajax({
        url: `${myUrl}/users/googleSignin`,
        method: 'POST',
        data: { id_token }
    })
        .done(function (response) {
            console.log(`User SignIn Google`);
            console.log(response);
            localStorage.setItem('token', response.token)

            $('#fa-sign-in').hide();
            $('#signout-button, .fa-sign-out').show();
            $('#fa-list').click();
        })
        .catch(function (err) { console.log(err) })
}
//
//      L O G O U T
//
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2
        .signOut()
        .then(function () {
            localStorage.removeItem('token');
            console.log('User signed out.');

            $('#fa-sign-in').show();
            $('#signout-button, .fa-sign-out').hide();
            location.reload();
        })
        .catch(function (err) { console.error(err) });
}