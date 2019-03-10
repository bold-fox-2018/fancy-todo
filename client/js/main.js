const serverUrl = `http://localhost:3000`

$(document).ready(() => {
    if (!localStorage.getItem(`token`)) {
        getAuth()
    } else {
        getHome()
    }
})

function getHome() {
    $('#auth').hide()
    $('#navbar').show()
    $('#home').show()
    getSideBar('Personal')
}

function getSideBar(type) {
    if (type === 'All Task') {
        $('#projects-sidebar').hide()
        $('#add-projecttodo').hide()
        $('#personal-sidebar').show()
        $('#add-personaltodo').show()
        getTag('All Task')
    } else if (type === 'Personal') {
        $('#projects-sidebar').hide()
        $('#add-projecttodo').hide()
        $('#personal-sidebar').show()
        $('#add-personaltodo').show()
        getTag('Personal')
    } else {
        $('#projects-sidebar').show()
        $('#add-projecttodo').show()
        $('#personal-sidebar').hide()
        $('#add-personaltodo').hide()
        getAllProjectTodo('All Task')
        getProjectList()
    }
}