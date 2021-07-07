function getAuth() {
  $('#auth').show()
  $('#navbar').hide()
  $('#home').hide()
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  $.post(`${serverUrl}/users/googleauth`, { idToken: id_token })
    .done(Response => {
      console.log("g-signIn Respones ===>", Response)
      console.log('sign in success')
      localStorage.setItem('token', Response.token)
      getHome()
    })
    .fail(err => {
      console.log(err)
    })
}

$('#registrationForm').submit((event) => {
  event.preventDefault()
  var body = {
    email: $('#email1').val(),
    password: $('#password1').val(),
    fullName: $('#fullName').val(),
    role: $('#role').val()
  }

  $.post(`${serverUrl}/users/register`, body)
    .done(Response => {
      console.log(Response)
      // localStorage.setItem('token', Response.token)
      $('#exampleModal').modal('toggle')
      getAuth()
    })
    .fail(err => {
      if (err.responseJSON.err.name == "ValidationError") {
        if (err.responseJSON.err.errors.email) {
          $('#registrationError').html(`<h6 style="color:red;">${err.responseJSON.err.errors.email.message}!</h6>`)
        } else {
          $('#registrationError').html(`<h6 style="color:red;">${err.responseJSON.err.errors.password.message}!</h6>`)
        }
      }
    })
})

$('#loginForm').submit((event) => {
  event.preventDefault()
  var body = {
    email: $('#email2').val(),
    password: $('#password2').val()
  }

  $.post(`${serverUrl}/users/login`, body)
    .done(Response => {
      console.log(Response)
      localStorage.setItem('token', Response.token)
      $('#exampleModal2').modal('toggle')
      getHome()
    })
    .fail(err => {
      console.log(err.responseJSON.msg)
      $('#loginError').html(`<h6 style="color:red;">${err.responseJSON.msg}!</h6>`)
    })
})

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('token')
  getAuth()
}