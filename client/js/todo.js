function add() {
    $.ajax({
            url: 'http://localhost:3000/api/user/add',
            method: 'POST',
            data: {
                token: localStorage.getItem('token'),
                name: $('#todoName').val(),
                description: $('#todoDescription').val(),
                due_date: $('#todoDue_date').val(),
                status: $('#todoStatus').val()
            },
            headers: {
                token: localStorage.token
            }
        })

        .done(function (data) {
            console.log(data);
            location.reload();
        })
        .fail(function (err) {
            console.log(err);

        })


}

function remove(ID) {
    // console.log(ID);

    $.ajax({
            url: `http://localhost:3000/api/user/remove/${ID}`,
            method: 'PATCH',

            headers: {
                token: localStorage.token
            }
        })

        .done(function (data) {
            console.log(data);
            location.reload();
        })
        .fail(function (err) {
            console.log(err);

        })

}

function edit(ID) {
    // $('#edit').show()
    console.log(ID);
    var link = `http://localhost:3000/api/todo/update/`

    $.ajax({
            url: link,
            method: 'GET',
            headers: {
                id: ID
            }

        })

        .done(function (data) {
            // console.log(data);

            let query = `<form id="edit" onsubmit="newData()">

            <label for="_id"><b>ID</b></label>
            <input type="text" value="${data._id}"   name="_id" id="todoId">
            <br>
            <label for="name"><b>name</b></label>
            <input type="text" value="${data.name}"   name="name" id="todoName1">
            <br>
    
            <label for="description"><b>description</b></label>
            <input type="text"  value="${data.description}" name="description" id="todoDescription1">
            <br>
    
            <label for="due_date"><b>due date</b></label>
            <input type="date"    name="due_date" id="todoDue_date1">
            <br>
    
            <label for="status"><b>status</b></label>
            <input type="text" value="${data.status}"  name="status" id="todoStatus1">
            <br>
    
            <input type="submit" value="Submit" id="submit_button"></input>
            <br>
        </form>`

            $('#edit').html(query)

            console.log(query);


        })
        .fail(function (err) {
            console.log(err);

        })


}

function newData() {
    var ID = $('#todoId').val()
    $.ajax({
            url: `http://localhost:3000/api/todo/${ID}`,
            method: 'PUT',
            data: {
                name: $('#todoName1').val(),
                description: $('#todoDescription1').val(),
                due_date: $('#todoDue_date1').val(),
                status: $('#todoStatus1').val()
            }
        })
        .done(data => {
            console.log(data);

            // $('#register_form').hide()
            // $('#login').show()
        })
        .fail(err => {
            console.log(err)
        })
}


function todo() {
    // console.log('ok
    $.ajax({
            url: 'http://localhost:3000/api/todo/one',
            method: 'GET',
            data: {
                token: localStorage.getItem('token')
            },
            headers: {
                token: localStorage.token
            }

        })
        .done(function (data) {
            console.log(data);
            let list = `<tr>
            <td>
                id
            </td>
            <td>￼edit

                nama
            </td>
            <td>
                description
            </td>
            <td>
                due_date
            </td>
            <td>
                status
            </td>
        </tr>`
            let con = 0
            for (var i = 0; i < data.todo.length; i++) {
                // console.log(data.todo[i]);

                list += ` 
                <div class="list">
                <form method="get" onsubmit="edit()">
                <tr>                
                <td><input type="text" value="${data.todo[i]._id}" id="editID"></input></td>
                <td><input type="text" value="${data.todo[i].name}"></input></td>
                <td><input type="text" value="${data.todo[i].description}"></input></td>
                <td><input type="text" value="${(data.todo[i].due_date) }"></input></td>
                <td><input type="text" value="${data.todo[i].status}"></input></td>
                <td><button type="submit"  value="${data.todo[i]._id}" onclick="edit(this.value)">Edit</button></td>
                <td><button type="submit"  value="${data.todo[i]._id}" onclick="remove(this.value)">delete</button></td>
                </tr>
                </form>
                </div>
               `
            }

            $('#allTodo').html(list)
            // console.log(list);

        })
        .fail(function (err) {
            console.log(err);

        })

}