function isSignIn () {
  userToken = localStorage.getItem('token');
  if(userToken){
    $('#signin').hide();
    $('#signup').hide();
    $('#googleSignIn').hide();
    
    $('#left-bar').show();
    $('#signout').show();
    $('#search-todo').show();
    $('#doughnut-chart').show();

    $('#form-signin').remove();
    $('#form-signout').remove();

    verify();
    readTodo('personal');
    readTodo('project');
    getInvitation();
    if(myLineChart){
      destroyChart();
    }
    loading('stop');
  } else {
    $('#signin').show();
    $('#signup').show();
    $('#googleSignIn').show();

    $('#todo').remove();

    $('#left-bar').hide();
    $('#signout').hide();
    $('#search-todo').hide();
    $('#doughnut-chart').hide();

    $('#content').empty();
    
    if(myLineChart){
      destroyChart();
    }
  }
}

async function verify () {
  await $.ajax({
    url:`${url}/user/verifyToken`,
    method:'POST',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    user = response;
    $('#userName').append(`Hello ${user.name}`);
    $('#form-signin').empty();
    $('#form-signup').empty();
    return true;
  })
  .fail(response => {
    if(response.responseJSON.err == `User Login Have Been Changed, Please Login Again`){
      signOut();
      notif('top-start', 'error', response.responseJSON.err);
    }
    else {
      notif('top-end', 'error', response.responseJSON.err);
    }
  })
}