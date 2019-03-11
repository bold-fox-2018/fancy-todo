function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token
    // console.log(id_token)
    $.post('http://localhost:3000/fancy-todo/tokensignin', { 
      idtoken: id_token }, function(data,status){
      localStorage.setItem('accesToken', data.accesToken)
    })
    
    $('.profile').html(`<div class="kotak"> ${profile.getName()}  </div> `)
    $('.profile').append(`<div class="kotak"> <img class="picbox" src="${profile.getImageUrl()}"> </div>`)
    $('.logout').html(`<a href="" onclick="signOut();"><button>Logout</button></a>`)
    $('#login').hide()
    $('#register').hide()
    // $('.g-signin2').hide()
  //   if (!localStorage.getItem("reload")) {
  //     /* set reload locally and then reload the page */
  //     localStorage.setItem("reload", "true");
  //     location.reload();
  //  }/* after reload clear the localStorage */
  //   else {
  //   localStorage.removeItem("reload");
  //   localStorage.clear(); // an option
  //  }
    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      localStorage.removeItem('accesToken');

    });
  }