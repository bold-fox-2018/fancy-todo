$(document).ready(function () {
    //
    //      F O R M   C R E A T E  TO DO
    //
    $('#fa-sticky-note-o').click(function () {
        if (localStorage.token) {
            let html = `
            <div class="modal fade" id="formCreateTodo" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5> Add New Task </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="background-color: yellow">
                            <input id="inTodoName" type="text" class="form-control" placeholder="Enter title">
                            <textarea id="inTodoDescription" class="form-control" placeholder="Enter description"></textarea>
                            <span style="text-align: center">Due Date: </span>
                            <input id="inTodoDue_date" type="date" class="form-control">
                            <button onclick="createTodo()" type="button" class="btn btn-primary" data-dismiss="modal">C R E A T
                                E</button>
                        </div>
                    </div>
                </div>
            </div>`
            $('#content').html(html);
        }
    })
    //
    //      L I S T   T O D O
    //
    $('#fa-list').click(function () {
        $.ajax({
            url: `${myUrl}/todos`,
            method: 'GET',
            headers: { token: localStorage.token }
        })
            .done(function (todos) {
                console.log(todos);
                let html = ``;
                todos.forEach((e, index) => {
                    let pinned = ``;
                    if (e.pinned) pinned = `<a href="#"><i class="fa fa-thumb-tack"></i></a>`;
                    else pinned = `<a href="#"><i class="fa fa-thumb-tack unpinned"></i></a>`
                    let date = new Date(e.due_date).toString().split(' ');
                    console.log(date);
                    html += ` 
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
                });
                $('#content').html(html)
            })
            .fail(function (err) {
                console.log(err);
            })
    })
})






