function SDate() {
    var UserDate = document.getElementById("startdate").value;
    var ToDate = new Date();

    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
        alert("The Date must be Bigger or Equal to today date");
        return false;
    }
    return true;
}

function SSDate() {
    var UserDate = document.getElementById("startUpdate").value;
    var ToDate = new Date();

    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
        alert("The Date must be Bigger or Equal to today date");
        return false;
    }
    return true;
}

function TTDate() {
    var UserDate = document.getElementById("duedate").value;
    var ToDate = new Date();

    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
        alert("The Date must be Bigger or Equal to today date");
        return false;
    }
    return true;
}

function TDate() {
    var UserDate = document.getElementById("dueUpdate").value;
    var ToDate = new Date();

    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
        alert("The Date must be Bigger or Equal to today date");
        return false;
    }
    return true;
}

$('#submit-task').on('click', function() {
    if(localStorage.getItem('token') == null) {
        swal('PLEASE LOGIN TO ACCESS TASK')
    } else {
        const token = localStorage.getItem('token')
        const taskName = $("#taskName").val()
        const priority = $('#priority').val()
        const startdate = $("#startdate").val()
        const dueDate = $('#duedate').val()

        $.ajax({
            url: 'http://localhost:5000/task/addnew',
            type: 'POST',
            data: {
                taskName: taskName,
                priority: priority,
                startDate: startdate,
                dueDate: dueDate
            },
            headers: { 'token': token }
        })
        .done(function(response) {
            console.log(response)
        })
        .fail(function(err) {
            console.log(err)
        })
    }
})  

function getTask() {
    if(localStorage.getItem('token') == null) {
        swal('PLEASE LOGIN TO ACCESS TASK')
    } else {
        const token = localStorage.getItem('token')
        $.ajax({
            url: `http://localhost:5000/task`,
            type: 'GET',
            headers: { 'token': token }
        })
        .done(function(list) {
            let html = ''
            if (list.data.length == 0) {
                html = '404 - Task Not Found'
                swal(html)
            } else {
                for (let i = 0; i < list.data.length; i++) {
                    let startSplit = list.data[i].startDate.split('').slice(0, 10).join('')
                    let dueSplit = list.data[i].dueDate.split('').slice(0, 10).join('')

                    document.getElementById('idUpdate').value = list.data[i]._id
                    document.getElementById('taskUpdate').value = list.data[i].taskName
                    document.getElementById('priorityUpdate').value = list.data[i].priority
                    document.getElementById('statusUpdate').value = list.data[i].status
                    document.getElementById('startUpdate').value = startSplit
                    document.getElementById('dueUpdate').value = dueSplit
                    html += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${list.data[i].taskName}</td>
                            <td>${list.data[i].priority}</td>
                            <td>${list.data[i].status}</td>
                            <td>${list.data[i].startDate}</td>
                            <td>${list.data[i].dueDate}</td>
                            <td><a href="#update" onclick="document.getElementById('update-wrapper').style.display='block'">Update</a> | <a href="#delete" onclick="deleteTask('${list.data[i]._id}')">Delete</a> | <a href="">Save To Google</a></td>
                        </tr>
                    `
                }
                $('.taskList').empty()
                $('.taskList').append(html)
            }
        })
        .fail(function(err) {
            console.log(err)
        })
    }
}

$('#submit-update').on('click', function() {
    if(localStorage.getItem('token') == null) {
        swal('PLEASE LOGIN TO ACCESS TASK')
    } else {
        const token = localStorage.getItem('token')
        const idTask = $('#idUpdate').val()
        const taskName = $('#taskUpdate').val()
        const priority = $('#priorityUpdate').val()
        const status = $('#statusUpdate').val()
        const startDate = $('#startUpdate').val()
        const dueDate = $('#dueUpdate').val()

        $.ajax({
            url: 'http://localhost:5000/task/update',
            type: 'PUT',
            data: {
                idTask: idTask,
                taskName: taskName,
                priority: priority,
                status: status,
                startDate: startDate,
                dueDate: dueDate
            },
            headers: { 'token': token }
        })
        .done(function(response) {
            console.log(response)
        })
        .fail(function(err) {
            console.log(err)
        })
    }
})

function deleteTask(value) {
    if(localStorage.getItem('token') == null) {
        swal('PLEASE LOGIN TO ACCESS TASK')
    } else {
        const token = localStorage.getItem('token')
        $.ajax({
            url: `http://localhost:5000/task/delete/${value}`,
            type: 'DELETE',
            headers: { 'token': token }
        })
        .done(function(response) {
            console.log(response)
        })
        .fail(function(err) {
            console.log(err)
        })
    }
}