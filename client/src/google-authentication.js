function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile()
    const id_token = googleUser.getAuthResponse().id_token
    let user = {
        token: id_token
    }

    server({
        url: `/login`,
        method: 'post',
        data: user
    })
    .then(({data}) => {
        // swal(`Welcome ${profile.getName()}!`, ``, "success");
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.id)
        userLogin = data.id
        login()
        fetchTodos()
        setTimeout(function () {
            getAllInvitationsForNotifications()
        }, 3000)
    })
    .catch(err => {
        console.log(err)
    })
}

function signOut() {
    // allMyTodos
    if (gapi) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
        .then(function () {
            $('#myNotifications').empty()
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            toHomepage()
            swal("Signing Out!", "", "success");
        });
    } else {
        $('#myNotifications').empty()
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        toHomepage()
        swal("Signing Out!", "", "success");
    }
}