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
function searchTodo() {
    let word = $('#searchTodo').val()
    $.ajax({
        url: `${myUrl}/todos?word=${word}`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(function (todos) {
            let html = ``;
            let prepend = `
            <table>
            <tr>
                <td><input class="form-control" type="text" id="searchTodo" placeholder="Enter title"></td>
                <td><i  onclick="searchTodo()" class="fa fa-search btn btn-info"></i></td>
            </tr>
            </table>`;
            todos.forEach((e) => {
                let pinned = ``;
                if (e.pinned) pinned = `<a onclick="updateTodo('${e._id}',false)" href="#"><i class="fa fa-thumb-tack"></i></a>`;
                else pinned = `<a onclick="updateTodo('${e._id}',true)" href="#"><i class="fa fa-thumb-tack unpinned"></i></a>`
                let date = new Date(e.due_date).toString().split(' ');
                console.log(date);
                let doc = ` 
                <div class="todo" id="${e._id}">
                    <div class="title">
                    <span class="hidTodo${e._id}" >${e.name}</span>${pinned}
                    <span hidden class="formUpdate${e._id}">Form Update</span>
                    </div>
                    
                    <div class="description formUpdate">
                    <span hidden class="formUpdate${e._id}">
                        <label for='name${e._id}' class="bold">Title</label>
                        <input id='name${e._id}' type="text" value="${e.name}" class="form-control">

                        <label for='description${e._id}' class="bold">Description</label>
                        <textarea id='description${e._id}' class="form-control" > ${e.description}</textarea>

                        <label for='date${e._id}' class="bold">Due Date</label>                            
                        <input id='date${e._id}' type="date" value="${e.due_date.slice(0, -14)}" class="form-control" >

                        <input id='complete${e._id}' type='checkbox' class= form-check-input' value="true"> Completed
                        <br>
                        <a href="#" onclick="updateTodo('${e._id}')" class="btn btn-info"><i class="fa fa-check"></i></a>
                    </span>
                    <span class="hidTodo${e._id}">${e.description}</span>
                    </div>

                    <div class="footer">
                        <span class="action hidTodo${e._id}">
                            <a href="#" onclick= "
                            $('.formUpdate${e._id}').removeAttr('hidden'); 
                            $('.nameTodo${e._id},.hidTodo${e._id}').attr('hidden','');
                            ">

                            <i class="fa fa-pencil-square"></i></a>
                            <a onclick="deleteTodo('${e._id}')" href="#"><i class="fa fa-trash"></i></a>
                        </span>
                        <span class="due_date hidTodo${e._id}" >${date[0]} ${date[1]} ${date[3]}</span>
                    </div>
                </div>`

                if (e.pinned) prepend += doc;
                else html += doc;
            });
            $('#content').html(html)
            $('#content').prepend(prepend)
            console.log(todos);
        })
        .fail(function (err) {
            console.log(err);
        })
}