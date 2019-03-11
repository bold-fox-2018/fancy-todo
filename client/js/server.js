const myUrl = `http://localhost:5000`;

$(document).ready(function () {

})
//
//  C R E A T E   T O D O
//
function createTodo() {
    console.log("lslsls");
    console.log($('#inTodoName').val());
    console.log($('#inTodoDescription').val());
    console.log($('#inTodoDue_date').val());
    $.ajax({
        url: `${myUrl}/todos`,
        method: 'POST',
        data: {
            name: $('#inTodoName').val(),
            description: $('#inTodoDescription').val(),
            complete: false,
            pinned: false,
            due_date: $('#inTodoDue_date').val()
        },
        headers: { token: localStorage.getItem('token') }
    })
        .done(function (todo) {
            console.log(todo);
        })
        .fail(function (err) {
            console.log(err);
        })
}
//
//  U P D A T E   T O D O
//
function updateTodo(id, isPinned) {
    console.log(isPinned);
    let pinned = false;
    if (isPinned) pinned = true;
    let name = $(`#name${id}`).val();
    let description = $(`#description${id}`).val();
    let due_date = $(`#date${id}`).val();
    let complete = $(`#complete${id}`).val();

    $.ajax({
        url: `${myUrl}/todos/${id}`,
        method: 'PUT',
        data: { name, description, due_date, complete, pinned },
        headers: { token: localStorage.getItem('token') }
    })
        .done(function (response) {
            $('#fa-list').click();
            console.log(response);
        })
        .fail(function (err) {
            console.log(err);
        })
}
//
//  D E L E T E   T O D O
//
function deleteTodo(id) {
    console.log(id);
    $.ajax({
        url: `${myUrl}/todos/${id}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(function (response) {
            $(`#${id}`).remove();
            console.log(response);
        })
        .fail(function (err) {
            console.log(err);
        })
}
//
//  S E A R C H  T O D O
//
function searchTodo(id) {
    console.log(id);
    // $.ajax({
    //     url: `${myUrl}/todos/${id}`,
    //     method: 'GET',
    //     headers: {
    //         token: localStorage.getItem('token')
    //     }
    // })
    //     .done(function (response) {
    //         console.log(response);
    //     })
    //     .fail(function (err) {
    //         console.log(err);
    //     })
}