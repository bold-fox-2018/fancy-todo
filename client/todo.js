// let link = 'http://localhost:3000'

console.log('sini sini')
$(document).ready(function() {
    if (localStorage.getItem('token')) {
        $('.classTodo').show()
        $('.addTodo').show()
        $('.updateTodo').show()
        $('.user').hide()
        $('.logout').show()
        $('.google').hide()
        $('#updateTodo').hide()
    } else {
        $('.classTodo').hide()
        $('.addTodo').hide()
        $('.updateTodo').hide()
        $('.user').show()
        $('.google').show()
        $('.logout').hide()
    }

    $.ajax({
            url: 'http://localhost:3000/fancyTodo/todo/read',
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(function(res) {
            let html = ''
            html += `
            <tr>
                <th>Name</th>
                <th>Desription</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Option</th>
            </tr>
            `
            res.todos.forEach(e => {
                console.log(e)
                html += `
                <tr>
                    <td>${e.name}</td>
                    <td>${e.description}</td>
                    <td>${e.status}</td>
                    <td>${e.dueDate}</td>
                    <td><button type="submit" value="${e._id}" onclick="updateTodo(this.value)">Edit</button><br><br><button type="submit"  value="${e._id}" onclick="deleteTodo(this.value)">Delete</button></td>
                </tr>
                `
            });
            $('#todos').append(html)
        })
        .fail(function(err) {
            console.log(err)
        })

    $('#createTodo').submit(function(event) {
        event.preventDefault()
        $.ajax({
                url: 'http://localhost:3000/fancyTodo/todo/create',
                method: 'POST',
                data: {
                    name: $('#name').val(),
                    description: $('#description').val(),
                    dueDate: $('#dueDate').val()
                },
                headers: {
                    token: localStorage.token
                }
            })
            .done(function(todo) {
                $('#todos').append(`
                <tr>
                    <td>${todo.name}</td>
                    <td>${todo.description}</td>
                    <td>${todo.status}</td>
                    <td>${todo.dueDate}</td>
                    <td><button type="submit" value="${todo._id}" onclick="updateTodo(this.value)">Edit</button><br><br><button type="submit"  value="${todo._id}" onclick="deleteTodo(this.value)">Delete</button></td>
                </tr>
            `)
            })
            .fail(function(err) {
                console.log(err)
            })
    })

    deleteTodo('')
    updateTodo('')

})

// function show(params) {

// }

function updateTodo(value) {
    console.log(value)
    $('#updateTodo').show()
    let url = `http://localhost:3000/fancyTodo/todo/update?_id=${value}`
    $.ajax({
            url,
            method: 'PUT',
            data: {
                name: $('#name').val(),
                description: $('#description').val(),
                status: $('#status').val(),
                dueDate: $('#dueDate').val()
            }
        })
        .done(function(todo) {
            $('#todos').append(`
                <tr>
                    <td>${todo.name}</td>
                    <td>${todo.description}</td>
                    <td>${todo.status}</td>
                    <td>${todo.dueDate}</td>
                    <td><button type="submit"  value="${todo._id}" onclick="updateTodo(this.value)">Edit</button><br><br><button type="submit"  value="${todo._id}" onclick="deleteTodo(this.value)">Delete</button></td>
                </tr>
            `)
            $('#updateTodo').hide()
        })
        .fail(function(err) {
            console.log(err)
        })

}

function deleteTodo(value) {
    // event.preventDefault()
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ni delete')
    console.log(value)
        // let halaman = `http://localhost:3000/fancyTodo/todo/delete/${value}`
    $.ajax({
            url: `http://localhost:3000/fancyTodo/todo/delete/${value}`,
            method: 'DELETE',
            headers: {
                token: localStorage.token
            }
        })
        .done(function(todo) {
            console.log(todo)
        })
        .fail(function(err) {
            console.log(err)
        })
}