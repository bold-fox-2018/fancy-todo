const baseURL = `http://localhost:3000`


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var token=googleUser.getAuthResponse().id_token;
    $.ajax({
        url:`${baseURL}/user/Gsignin`,
        method:'POST',
        data:{
          token
        }
    })
    .done(function(response){
      $(`#inlogin`).hide()
      $(`#inhome`).show()
      task()
    })
    .fail(function(error){
      console.log(error)
    })
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    $(`#inhome`).hide()
    $(`#inlogin`).show()
    });
  }

  function signUp() {
    $('#signUp').submit(function (event) {
      event.preventDefault()
      $.ajax({
        url:`${baseURL}/user/signup`,
        method:'POST',
        data:{
          email:$(`#email`).val(),
          password:$(`#password`)
        }
      })
      .done(function (user) {
        // console.log(user)
        $('#inlogin').hide()
        $('#inhome').show()
      })
      .fail(function(error) {
        console.log(error)
      })
    })  
  }

  function task() {
    $.ajax({
      url:`${baseURL}/user`,
      method:'GET',
    })
    .done(function (data) {
      let result = ''
      data.forEach(element => {
        result+=`<li>${element} <li>`
      });
      $(`#listtodo`).append(result)
    })
    .fail()
    $(`#listTodo`).show('<p>you have not add task to do </p>')
  }

  function addTask() {
    $(`#addTodo`).submit(function (event) {
      event.preventDefault()
      $.ajax({
        url:`${baseURL}/todo/create`,
        method:`POST`,
        data:{
          name:('#name').val(),
          description:('#description').val(),
          due_date:(`#dueDate`).val()
        }
      })
    })
    .done(function (data) {
      console.log({data:data,message:'task has add succesfully'})
    })
    .fail(function (err) {
      console.log(err)
    })
  }
  
  function updateTask() {
    $(`#addTodo`).submit(function (event) {
      event.preventDefault()
      $.ajax({
        url:`${baseURL}/todo/create`,
        method:`POST`,
        data:{
          name:('#name').val(),
          description:('#description').val(),
          due_date:(`#dueDate`).val()
        }
      })
    })
    .done(function (data) {
      console.log({data:data,message:'task has add succesfully'})
    })
    .fail(function (err) {
      console.log(err)
    })
  }