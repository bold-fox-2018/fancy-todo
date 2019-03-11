$('#submit-reg').on('click', function() {
    const firstname = $("#firstName").val()
    const lastname = $("#lastName").val()
    const email = $("#email").val()
    const username = $("#username").val()
    const password = $("#password").val()

    $.ajax({
        url: `http://localhost:5000/user/register`,
        type: 'POST',
        data: {
            firstName: firstname,
            lastName: lastname,
            email: email,
            username: username,
            password: password
        },
    })
    .done(function(response) {
        console.log(response)
    })
    .fail(function(err) {
        console.log(err)
    })
})
