function isLogin(input) {
    if (input == true) {
        $('#login').hide()
        $('#register_form').hide()
        $('#buton1').show()
        $('#buton2').show()
        $('#addlist').show()
        $('#buton2').show()
        // location.reload();
    } else {
        $('.profile').hide()
        $('#allTodo').hide()
        $('#addlist').hide()


        $('#buton1').hide()
        $('#buton2').hide()
        $('#buton3').hide()
        $('#login').show()
        $('#register_form').show()
        // location.reload();
    }
    // location.reload();
}

$(document).ready(function () {
    // let youtubePlayer = ``
    // location.reload();
    // $('#content').append(youtubePlayer);
    if (localStorage.getItem('token')) {
        isLogin(true)

    } else {
        isLogin(false)
    }
})