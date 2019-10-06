function loginButtonPressedFromNavbar() {
    $('#homepageHeader').hide()
    
    $('#toForms').append(`
        <div id="headerLogin">
            <img src="http://www.workflowmax.com/hubfs/6-things-to-do-list.png" class="col-12 vh-90" alt="">
        </div>
        <div class="d-flex">
            <div id="submission-form" class="container my-5 mx-5 justify-content-center">
                <div>
                    <h1>Login Form</h1>
                    <form method="post" id="LoginFromNavbar">
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="text" class="form-control col-10 formControl" aria-describedby="emailHelp" placeholder="Enter email" id="email_data_from_navbar">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control col-10 formControl"  placeholder="Password" id="password_data_from_navbar">
                        </div>
                        <button type="submit button" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
            <div id="sideBarLogin">
                <div class="container my-5">
                    <div>
                        <a href="#" onclick="signupButton()"><img src="https://img.icons8.com/nolan/64/000000/checked-2.png"> Sign Up</a>
                    </div>
                    <div>
                        <a href="#" onclick="loginButtonPressedFromSidebar()"><img src="https://img.icons8.com/nolan/64/000000/checked-2.png"> Login</a> 
                    </div>
                </div>
            </div>
        </div>
    `)

    $("#LoginFromNavbar").on("submit", function(event) {
        event.preventDefault()
        server({
            url: `/login`,
            method: 'post',
            data: {
                email: $('#email_data_from_navbar').val(),
                password: $('#password_data_from_navbar').val()
            }
        })
        .then(({data}) => {
            login()
            fetchTodos()
            swal('Welcome!')
            setTimeout(function () {
                getAllInvitationsForNotifications()
            }, 3000)
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            userLogin = data.id
        })
        .catch(err => {
            if (err.response.data.msg) {
                swal(`${err.response.data.msg}`, "", "error")
            } else {
                swal(`Internal Server Error`, "", "error")
            }
        })
    })
}

function loginButtonPressedFromSidebar() {
    $('#submission-form').empty()
    $('#submission-form').append(`
    <div id="login-form">
        <h1>Login Form</h1>
        <form id="logindata">
            <div class="form-group">
                <label>Email address</label>
                <input type="text" class="form-control col-10 formControl" aria-describedby="emailHelp" placeholder="Enter email" id="email_login_from_start">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control col-10 formControl"  placeholder="Password" id="password_login_from_start">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
    `)

    $("#logindata").on("submit", function(event) {
        event.preventDefault()
        server({
            url: `/login`,
            method: 'post',
            data: {
                email: $('#email_login_from_start').val(),
                password: $('#password_login_from_start').val()
            }
        })
        .then(({data}) => {
            login()
            fetchTodos()
            swal('Welcome!')
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            setTimeout(function () {
                getAllInvitationsForNotifications()
            }, 3000)
            userLogin = data.id
        })
        .catch(err => {
            // console.log(err)
            if (err.response.data.msg) {
                swal(`${err.response.data.msg}`, "", "error")
            } else {
                swal(`Internal Server Error`, "", "error")
            }
        })
    })
}

function signupButton() {
    $('#submission-form').empty()
    $('#submission-form').append(`
    <div id="errorSignUpValidation" style="color: red;"></div>
    <div id="register-form">
        <h1>Register Form</h1>
        <form method="post" id="RegisterData">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control col-10 formControl" placeholder="Enter full name" id="full_name_signup">
            </div>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control col-10 formControl" aria-describedby="emailHelp" placeholder="Enter username" id="username_signup">
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="text" class="form-control col-10 formControl" aria-describedby="emailHelp" placeholder="Enter email" id="email_signup">
            </div>
            <div class="form-group">
                <label >Password</label>
                <input type="password" class="form-control col-10 formControl" placeholder="Password" id="password_signup">
            </div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
        <hr> OR <hr>
    </div>
    `)

    $('#RegisterData').submit(function(event) {
        event.preventDefault()
        server({
            url: `/signup`,
            method: 'post',
            data: {
                name: $('#full_name_signup').val(),
                username: $('#username_signup').val(),
                email: $('#email_signup').val(),
                password: $('#password_signup').val()
            }
        })
        .then(({data}) => {
            swal('Welcome!')
            fetchTodos()
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            userLogin = data.id
            login()
        })
        .catch(err => {
            let errorsVal = ''
            if (!err.response.data.modelValidation) {
                swal(`Internal server error!`)
            } else {
                err.response.data.modelValidation.forEach(e => {
                    errorsVal += `${e} \n || `
                });
                errorSignUpValidation.append(`
                    ${errorsVal}
                `)
            }
        })
    })
}

function getAllInvitationsForNotifications() {
    server({
        url: `/projects/look-invitation`,
        method: 'get',
        headers: {
            access_token: localStorage.getItem('token')
        }
    })
    .then(({data}) => {
        $('#myNotifications').empty()
        projectInvitations = data
        if (data.length > 0) {
            $('#myNotifications').append(`
                (${data.length})
            `)
        }
    })
    .catch(err => {
        console.log(err)
    })
}