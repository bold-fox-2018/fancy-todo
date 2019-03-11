$(document).ready(function () {
    $('#navbar').append(`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="container">
          <div class="row">
            <div class="col">
              <a class="navbar-brand" href="#" onclick="showContent()">Fancy ToDo List</a>
            </div>
            <div class="col offset-md-7">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                </li>
                
                <li class="nav-item">
                  <a id="register_click" href="#" onclick="register()" class="btn-edt">Register</a>
                </li>
                <li class="nav-item">
                  <a href="#" id="login_click" onclick="login()" class="btn-edt">Sign in</a>
                </li>
                <li class="nav-item">
                  <a href="#" onclick="signOut()" id="sign_out" class="btn-edt">Sign out</a>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    </nav>`)
  })