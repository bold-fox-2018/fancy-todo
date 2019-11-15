function login() {
    $.ajax({
            url: 'http://localhost:3000/api/user/login',
            method: 'POST',
            data: {
                email: $('#emailLogin').val(),
                password: $('#passwordLogin').val(),
                loginVia: 'website'
            }
        })
        .done(function (data) {
            // console.log(data);
            // location.reload();

            localStorage.setItem('token', data.token)
            isLogin(true)
        })
        .fail(err => {
            console.log(err)
        })
}