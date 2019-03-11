$(document).ready(function(){
    $('#todolist').submit(function(event){
        event.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/fancy-todo/todo/list/create',
            method: 'POST',
            data: {
                token: localStorage.getItem('accesToken'),
                name: $('#name').val(),
                description: $('#description').val(),
                status: $('#status').val(),
                due_date: $('#due_date').val()
            }
        })
        .done(data=>{
            // console.log(data)
            // reload()
        //    $('.todos').html(`${todo.name} ${todo.description} ${todo.status} ${todo.due_date}`) 
        $('.todos').prepend(`
        <div class="list">
        <h3 hidden>${data._id}</h3>
        <h3>${data.name}</h3>
        <p>${data.description}</p>
        <p>${data.status}</p>
        <p>${data.due_date}</p>
        </div>
        `)
        $('#login').hide()
        $('#register').hide()
        })
        .fail(err=>{
            console.log(err)
        })
    })

        $.ajax({
            url: 'http://localhost:3000/fancy-todo/todo/list/find',
            method: 'GET',
            headers: {
                token: localStorage.getItem('accesToken')
            }
        })
        .done(todo=>{
                todo.forEach(element => {
                    $('.todos').prepend(`
                    <div class="list">
                    <h3 hidden>${element._id}</h3>
                    <h3>${element.name}</h3>
                    <p>${element.description}</p>
                    <p>${element.status}</p>
                    <p>${element.due_date}</p>
                    </div>
                    `)   
                })
        })
        .fail(err=>{
            console.log(err)
        })
})