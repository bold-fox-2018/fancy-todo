function signin() {
  let username = $('#username').val();
  let email = $('#email').val();

  $.ajax({
    method: 'post',
    url: 'http://localhost:3000/signin/local'
  })

}