var register = document.getElementById('register-wrapper')
var login = document.getElementById('login-wrapper')

window.onclick = function(event) {
    if (event.target == register) {
        register.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == login) {
        login.style.display = "none";
    }
}