const server = axios.create({
    // baseURL: `http://server-ecommerce.mahdihrs.world`
    baseURL: `http://localhost:3000`
})

let usernameLogin = ''
let userLogin = ''
let allMyTodos = []
let allMyProjects = []
let projectInvitations = []
let projectId = ''

if (!localStorage.getItem('token')) {
    toHomepage()
} else {
    login()
}

function toHomepage() {
    $('.usersLogin').hide()
    $('.noLogin').show()
}

function login() {
    getAllInvitationsForNotifications()
    todoMenu()
    setTimeout(function () {
        fetchTodos()
        $('.usersLogin').show()
        $('.noLogin').hide()
        $('#toForms').empty()
    }, 3000)
}

// function signOut() {
//     $('#myNotifications').empty()
//     localStorage.removeItem('token')
//     localStorage.removeItem('id')
//     toHomepage()
//     swal("Signing Out!", "", "success");
// }

function convertDate(date) {
    date = new Date(date)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    switch (month) {
        case 1:
            month = 'January'
            break;
        case 2:
            month = 'February'
            break;
        case 3:
            month = 'March'
            break;
        case 4:
            month = 'April'
            break;
        case 5:
            month = 'May'
            break;
        case 6:
            month = 'Juny'
            break;
        case 7:
            month = 'July'
            break;
        case 8:
            month = 'August'
            break;
        case 9:
            month = 'September'
            break;
        case 10:
            month = 'October'
            break;
        case 11:
            month = 'November'
            break;
        case 12:
            month = 'December'
            break;
        default:
            break;
    }
    return `${day} ${month} ${year}`
}