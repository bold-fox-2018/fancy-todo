function formSignin () {
  $('#form-signup').remove();
  $('#form-signin').remove();
  $('#sign').append(`
    <div id="form-signin">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign In</h5>
              <form id="form-signin" class="form-signin" onsubmit="signIn()">
                <div class="form-label-group">
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                  <label for="inputPassword">Password</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

function formSignup () {
  $('#form-signin').remove();
  $('#form-signup').remove();
  $('#sign').append(`
    <div id="form-signup">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign Up</h5>
              <form id="form-signin" class="form-signin" onsubmit="signUp()">
                <div class="form-label-group">
                  <input type="text" id="inputName" class="form-control" placeholder="Name" required autofocus>
                  <label for="inputName">Name</label>
                </div>

                <div class="form-label-group">
                  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                  <label for="inputPassword">Password</label>
                </div>

                <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
}

//script for Google Sign In
function onSignIn(googleUser) {
  loading('start');
  if(!localStorage.getItem('token')){
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      url:`${url}/user/signin`,
      method:'POST',
      headers:{
        token_id: id_token
      }, data: {
        loginVia: 'google'
      }
    })
    .done(response => {
      notif('top-end', 'success', 'Sign in Success');
      localStorage.setItem('token', response.token);
      user._id = response.userId;
      user.name = response.userName;
      isSignIn();
    })
    .fail(err => {
      notif('top-end', 'error', err.responseJSON.err);
      loading('stop');
    })
  }
}

//script for Google Sign Out
function signOut () {
  loading('start');
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.removeItem('token');
    user = {};
    notif('top-end', 'success', 'Sign out Success');
    isSignIn();
    $('#userName').empty();
    $('#content').append(`
    <center>
      <img src="./homePage.svg" alt="Home Page" style="height:50vh; margin-top:20vh; max-height:50vh; overflow: hidden;">
    </center>`);
    loading('stop');
  });
}

//sign in from web
function signIn () {
  loading('start');
  if(!localStorage.getItem('token')){
    $('#form-signin').on('submit', function(event){
      event.preventDefault();
      $.ajax({
        url:`${url}/user/signin`,
        method:'POST',
        data: {
          email: $('#inputEmail').val(),
          password: $('#inputPassword').val(),
          loginVia: 'website'
        }
      })
      .done(response => {
        notif('top-end', 'success', 'Sign in Success');
        localStorage.setItem('token', response.token);
        user._id = response.userId;
        user.name = response.userName;
        isSignIn();
      })
      .fail(response => {
        notif('top-end', 'error', response.responseJSON.err);
        loading('stop');
      }) 
    })
  }
}

//sign up from web
function signUp () {
  loading('start');
  $('#form-signup').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      url:`${url}/user/signup`,
      method:'POST',
      data: {
        name: $('#inputName').val(),
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val(),
        loginVia: 'website'
      }
    })
    .done(response => {
      notif('top-end', 'success', 'Sign up Success');
      $('#form-signup').remove();
      loading('stop');
    })
    .fail(err => {
      notif('top-end', 'error', err.responseJSON.err);
      loading('stop');
    }) 
  })
}
 