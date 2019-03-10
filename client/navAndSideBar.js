navBar();
isSignIn();

function navBar () {
  $('#navbar').append(`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#" onclick="showHomePage()">Fancy To Do List</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="left-bar" class="options"></div>    

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mr-auto mr-sm-2">
            <a id="signin" href="#" onclick="formSignin();">
              <button class="btn btn-primary"> Sign In </button>  
            </a>    
          </li>
          <li class="nav-item mr-auto mr-sm-2">
            <a id="signup" href="#" onclick="formSignup();">
              <button class="btn btn-success"> Sign Up </button>  
            </a>
          </li>
          <li class="nav-item mr-auto mr-sm-2"">
            <div id="googleSignIn" class="g-signin2" data-onsuccess="onSignIn"></div>
          </li>
        </ul>
        <div id="userName" class="navbar-brand"></div>
        <form id="search-todo" class="form-inline my-2 my-lg-0" onsubmit="searchToDo()">
          <input id="input-search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <a id="signout" href="#" onclick="signOut();" style="margin-left:10px">
          <button class="btn btn-danger"> Sign Out </button>  
        </a>
      </div>
    </nav>`);
  $('#search-todo').on('submit', function(event){
    event.preventDefault();
  })
  leftBar();
}

function leftBar () {
  $('#left-bar').append(`
    <div class="row">
      <a href="#" onclick="showMyTodo()"> Show My Todo </a>
      <a href="#" onclick="showAllProjects()">Show All Project</a>
    </div>`);
}
