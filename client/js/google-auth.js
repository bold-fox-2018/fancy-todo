function signInGoogle(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  
  $.post(`${baseUrl}/signin/google`, { id_token }, function(data, status) {
    console.log(data.token)
    localStorage.setItem('token', data.token)
    localStorage.setItem('fullname', data.fullname)
    // $('#content').html(`<p>dashboard</p>`)
    $('#option').html(`
      <li>${localStorage.getItem('fullname')}</li>
      <li><a onclick="signOutGoogle();" id="signout-button">Sign out</a></li>
    `)
    $('#login-form').hide()
    $('#dashboard').show()
    $('.modal').modal();
    showAll()
    
  })
}

// $(document).ready(function() {
//   $('#form-signin').submit(function(e) {
//     e.preventDefault();
  
//     let username = $('#username').val();
//     let password = $('#password').val();
  
//     $.post(`${baseUrl}/signin/local`, { username, password }, function(data, status) {
//       window.location.replace("dashboard.html")
//     })
//   })
// })

function signOutGoogle() {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2
    .signOut()
    .then(function() {
      localStorage.removeItem('token');
      // $('#content').html(content.login)
      // $('#option').html(``)
      $('#login-form').show()
      $('#dashboard').hide()
      $('#option').html('')
    })
}