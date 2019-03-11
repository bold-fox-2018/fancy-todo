const baseURL = 'http://localhost:4000';

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
        url: `${baseURL}/users/login`,
        method: 'POST',
        data: {
            id_token: id_token,
            loginVia: 'google'
        }
  })
    .done(data => {
        console.log("Hasil login via google", data)
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
  });
}