function register() {
    console.log($('#email').val())
    console.log($('#pw').val())
    $.ajax({
            url: 'http://localhost:3000/api/user/register',
            method: 'POST',
            data: {
                email: $('#emailReg').val(),
                password: $('#passwordReg').val()
            }
        })
        .done(data => {
            console.log(data);

            $('#register_form').hide()
            $('#login').show()
        })
        .fail(err => {
            console.log(err)
        })
}