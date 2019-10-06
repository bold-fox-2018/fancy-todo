

function isLogin(input) {
    if(input == true) {

        $('#login_click').hide()
        $('#register_click').hide()
        $('#sign_out').show()
        $('#google_signin').hide()
        $('#register_form').hide()
        $('#login').hide()
        $('#welcome-before-signin').hide()
        $('#content').show()
        $('#body-after-signin').show()
        $('#welcome-after-signin').show()
        getmytodolist()
    } else {
        $('#login_click').show()
        $('#register_click').show()
        $('#sign_out').hide()
        $('#google_signin').hide()
        $('#register_form').hide()
        $('#login').hide()
        $('#welcome-before-signin').show()
        $('#content').hide()
        $('#body-after-signin').hide()
        $('#welcome-after-signin').hide()
      
    }
}

function getmytodolist() {
    console.log("masuk function getmytodolist")
    const token = localStorage.getItem('token') 
    console.log("token", token)
    $.ajax({
        url: `${baseURL}/todos/mytodo`,
        method: 'GET',
        headers: {'token': token},
    })
    .done(data => {
        $('#todoRow').empty()
        $('#todoRow').show()
        $('#todoDetail').hide()
        $('#todoEdit').hide()
        $('#todoDelete').hide()
        
        console.log("Hasil Pencarian", data, data.data.length)
        let mylist =''
        for(let i=0; i<data.data.length; i++) {
            mylist += `<div class="col-md-4 offset-md-2">${data.data[i].title}</div> 
            <div class="col-md-2"><button value="${data.data[i]._id}" onclick="detailtodolist(this.value)">Detail</button></div>
            <div class="col-md-2"><button value="${data.data[i]._id}" onclick="detailTodoListforEdit(this.value)">Edit</button></div>
            <div class="col-md-2"><button value="${data.data[i]._id}" onclick="deletetodolist(this.value)">Delete</button></div>`
        }
        $('#todoRow').append(mylist)
    })
    .fail(error => {
        console.log("Terjadi error", error)
    })
}

function detailtodolist(todoId) {
    console.log("Masuk ke function detail ==>", todoId)
    const token = localStorage.getItem('token')
    $.ajax ({
        url: `${baseURL}/todos/mytodo/${todoId}`,
        method: 'GET',
        headers: {'token': token}
    })
    .done(detailData => {
        console.log("function detail ==>", detailData)
        $('#todoDetail').empty()
        $('#todoRow').hide()
        $('#todoDetail').show()
        $('#todoEdit').hide()
        $('#todoDelete').hide()
        let tododetail = ''
        tododetail = `Title: ${detailData.data.title}<br>
        Description: ${detailData.data.description}<br>
        Status: ${detailData.data.status}<br>
        Due Date: ${detailData.data.duedate}<br><br>
        <div class="col-md-2"><button onclick="getmytodolist()">All To Do</button></div>
        <div class="col-md-2"><button value="${todoId}" onclick="detailTodoListforEdit(this.value)">Edit</button></div>
        <div class="col-md-2"><button value="${todoId}" onclick="deletetodolist(this.value)">Delete</button></div>`
        $('#todoDetail').append(tododetail)

    })
    .fail(error => {
        console.log("Terjadi error", error)
    })
}

function detailTodoListforEdit (todoId) {
    console.log("Masuk ke function detail for edit ==>", todoId)
    const token = localStorage.getItem('token')
    $('#todoRow').hide()
    $('#todoDetail').hide()
    $('#todoEdit').show()
    $('#todoDelete').hide()
    $.ajax ({
        url: `${baseURL}/todos/mytodo/${todoId}`,
        method: 'GET',
        headers: {'token': token}
    })
    .done(detailData => {
        console.log("function detail ==>", detailData)
        $('#todoEdit').empty()
        $('#todoRow').hide()
        $('#todoDetail').hide()
        $('#todoEdit').show()
        $('#todoDelete').hide()
        let tododetailtoedit = ''
        tododetailtoedit = `
        <form id="editForm" onsubmit="edittodolist()">
            Todo ID (Cant Edit): <input value="${detailData.data._id}" type="text" name="todoId" id="todoId" readonly="readonly"> <br>
            Title: <input value="${detailData.data.title}" type="text" name="todoTitle" id="todoTitle"> <br>
            Description: <input type="text" value="${detailData.data.description}" name="todoDesc" id="todoDesc"><br>
            Status: <input type="text" name="todoStatus" list="statusList" id="todoStatus">
                <datalist id="statusList">
                    <option value="INCOMPLETE">  
                    <option value="COMPLETE">
                </datalist> <br>
            DueDate: <input type"date" value="${detailData.data.duedate}" name="todoDueDate" id="todoDueDate"> <br>
            <input type="submit" value="Edit" id="edit_button">
            <button onclick="getmytodolist()">Cancel</button>
        </form>`
        console.log('Form untuk edit', tododetailtoedit)
        $('#todoEdit').append(tododetailtoedit)
    })
    
}

function edittodolist() {
    console.log("Masuk ke function for edit ==>", todoId)
    const token = localStorage.getItem('token')
    $.ajax ({
        url: `${baseURL}/todos/edit/${$('#todoId').val()}`,
        method: 'PUT',
        headers: {'token': token},
        data: {
            title: $('#todoTitle').val(),
            description: $('#todoDesc').val(),
            status: $('#todoStatus').val(),
            duedate: $('#todoDueDate').val(),
        }
    })
    .done(result => {
        console.log("Berhasil update", result)
        getmytodolist()
    })
    .fail(error => {
        console.log("Terjadi error", error)
    })
}

// $(document).ready(function () {
//     if(localStorage.getItem('token')){
//       isLogin(true)
//       $('#sign_out').show()
//     }
//     else {
//       isLogin(false)
//       $('#sign_out').hide()
//     }
// })

function deletetodolist (input) {
    console.log("Masuk ke function delete ==>", input)
}