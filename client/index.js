  let token = localStorage.getItem('token')
  let dueDateStr
  $('#popup-form').hide()
  $('#plusTask').click(function() {
    $('#popup-form').toggle()
  })
  
  $('#calendar').datepicker({
    inline: true,
    firstDay: 1,
    showOtherMonths: true,
    minDate: 0,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dateFormat: 'yy-mm-dd',
    inline: true,
    onSelect: function(dateText, inst) {
      let date = $(this).datepicker('getDate'),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear()
      dueDateStr = day + '-' + month + '-' + year
      $('#dueDate').val(day + '-' + month + '-' + year)
      $('.form-open .edit-input-date').val(dueDateStr)
    }
  })
  
  let nowdate = new Date()
  let nday = nowdate.getDate(),
    nmonth = nowdate.getMonth() + 1,
    nyear = nowdate.getFullYear()
  
  $('#dueDate').val(nday + '-' + nmonth + '-' + nyear)
  
  function getTodos () {
    $.ajax({
      type: 'GET',
      url: `https://fancytd-server.hanabc.xyz/api/todos/list`,
      headers: {
        token: localStorage.getItem('token')
      },
      dataType: 'json'
    })
      .done(function(result) {
        let todos = []
        let todobj = {}
        result.todo.forEach(item => {
          (todobj.task = item.title),
            (todobj.desc = item.description),
            (todobj.date = item.endDate),
            (todobj.isCompleted = item.status)
          todos.push(todobj)
          todobj = {}
        })
    
        showTodos(todos)
      })
      .fail(function(err) {
        alertify.alert(err.responseJSON.message)
      })
  }
  
  function showTodos(todos) {
    var todosListEl = $('#todos-list')
  
    todosListEl.empty()
  
    let index = 0
    todos.forEach(function(todo) {
      var taskClasses = 'todo-task' + (todo.isCompleted ? ' is-completed' : '')
  
      let fulldate = String(todo.date).substr(0, 10),
        date = fulldate.split('-'),
        monIn = Number(date[1]),
        monNamesMin= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Agst', 'Sep', 'Oct', 'Nov', 'Dec' ]
  
      let ddmmyy = Number(date[2]) + ' ' + monNamesMin[monIn - 1] + ' ' + Number(date[0])
      dueDateStr = ddmmyy
  
      todosListEl.append(`
          <li class="${taskClasses}" style="overflow:hidden; word-wrap: break-word; padding: 5px" value="${todo.isCompleted}">
              <div class="form-${index}"></div>
              <div class="delete-box"></div>
              <div class="intitle task-${index} ${todo.task}" onclick="toggleTodo('${todo.task}',${todo.isCompleted})"><p>${todo.task}</p></div>
              <div class="indesc desc-${index} ${todo.desc}" onclick="toggleTodo('${todo.task}',${todo.isCompleted})"><p>${todo.desc}</p></div>
              <div class="indate date-${index} ${todo.date}" onclick="toggleTodo('${todo.task}',${todo.isCompleted})">${dueDateStr}</div>
              <div class="buttons buttons-${index}" >
                  <button class="edit-button" onclick="enterEditMode('${index}','${todo.task}', '${todo.desc}', '${todo.date}')"><i class="fa fa-edit"></i></button>
                  <button class="delete-button" onclick="deleteTask('${index}','${todo.task}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  <button class="save-button save-button-${index}"><i class="fa fa-save"></i></button>
                  <button class="cancel-button" onclick="exitEditMode('${index}','${todo.task}', '${todo.desc}', '${todo.date}')"><i class="fa fa-times"></i></button>
              </div>
          </li>
          `);
      index++;
    });
  }
  
  function addTodo(title, desc, dueDate, isCompleted) {
    var errorMessage = null;
  
    if (!title || title.length === 0) {
      errorMessage = 'Task cannot be empty.';
    }
    if (errorMessage) {
      showError(errorMessage);
      return;
    }
  
    let postToDate = dueDate.split('-'),
      postdmy = `${postToDate[2]}-${postToDate[1]}-${Number(postToDate[0])+1}`,
      duePostdmy = new Date(postdmy);
  
    $.ajax({
      method: 'POST',
      url: `https://fancytd-server.hanabc.xyz/api/todos/list`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        title: title,
        desc: desc,
        date: duePostdmy,
        isCompleted: isCompleted
      },
      dataType: 'json'
    })
      .done(function(data) {
        if (data) {
          getTodos()
          $('#create-form #title').val('')
          $('#create-form #desc').val('')
        }
        else alertify.alert('Sorry, your connection to database is interrupted');
      })
      .fail(err => {
        errorMessage = 'Task already exist'
        showError(errorMessage)
      })
  }
  
  function showError(errorMessage) {
    $('.error-message')
      .html(errorMessage)
      .slideDown()
  }
  
  function toggleTodo(title, isCompleted) {
    $.ajax({
      method: 'PUT',
      url: `https://fancytd-server.hanabc.xyz/api/todos/list`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        title: title,
        isCompleted: !isCompleted
      },
      dataType: 'json'
    })
      .done(function(data) {
        if (data) getTodos()
        else alertify.alert('Sorry, your connection to database is interrupted')
      })
      .fail(err => {
        console.log(err, 'masuk')
        alertify.alert(err.message)
      })
  }
  
  function enterEditMode(index, title, desc, date) {
    $(`.buttons-${index} .save-button`).show();
    $(`.buttons-${index} .cancel-button`).show();
    $(`.buttons-${index} .edit-button`).hide();
    $(`.buttons-${index} .delete-button`).hide();
  
    $(`.task-${index}`).hide();
    $(`.desc-${index}`).hide();
    $(`.date-${index}`).hide();
  
    let fulldate = String(date).substr(0, 10),
      pendate = fulldate.split('-'),
      ddmmyy = Number(pendate[2]) + '-' + Number(pendate[1]) + '-' + Number(pendate[0]);
    dueDateStr = ddmmyy;
  
    $(`.form-${index}`).addClass("form-open")
      .append(`<input type="text" name="title" class="edit-input edit-input-title" value="${title}" />
      <input type="text" name="desc" class="edit-input edit-input-desc" value="${desc}" />
      <input type="text" name="date" class="edit-input edit-input-date" value="${dueDateStr}" readonly/>`);
  
    $(".save-button").click(function() {
      $(".save-button").trigger(
        saveTask(
          `${title}, ${$(".edit-input-title").val()}, ${$(
            ".edit-input-desc"
          ).val()}, ${$(".edit-input-date").val()}`
        )
      );
    });
  }
  
  function exitEditMode(index) {
    $(`.buttons-${index} .save-button`).hide();
    $(`.buttons-${index} .cancel-button`).hide();
    $(`.buttons-${index} .edit-button`).show();
    $(`.buttons-${index} .delete-button`).show();
  
    $(`.task-${index}`).show();
    $(`.desc-${index}`).show();
    $(`.date-${index}`).show();
    $(`.form-${index}`)
      .removeClass('form-open')
      .children()
      .remove();
  }
  
  function saveTask(data) {
    data = data.split(', ');
    let oldtitle = data[0],
      title = data[1],
      desc = data[2],
      spdate = data[3].split('-');
  
    let month = Number(spdate[1])
    let monNamesMin= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Agst', 'Sep', 'Oct', 'Nov', 'Dec' ];
    let datesp = `${Number(spdate[0])+1}-${monNamesMin[month-1]}-${Number(spdate[2])}`;
  
    let nuDate = new Date(datesp)
  
    $.ajax({
      method: 'PUT',
      url: `https://fancytd-server.hanabc.xyz/api/todos/${oldtitle}`,
      headers: {
            token: localStorage.getItem('token')
          },
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        title: title,
        desc: desc,
        date: nuDate.toISOString()
      }
    })
      .done(function(data) {
        if (data) getTodos()
        else alertify.alert('Sorry, your connection to database is interrupted');
      })
      .fail(err => {
        alertify.alert('Sorry, your connection to database is interrupted');
      });
  }
  
  function deleteTask(index, title) {
  
    alertify.confirm('Delete Confirmation', 'Are you sure?', () => {
      $.ajax({
        method: 'DELETE',
        url: `https://fancytd-server.hanabc.xyz/api/todos/${title}`,
        headers: {
          token: localStorage.getItem('token')
        },
        dataType: 'json'
      })
        .done(function(data) {
          if (data) {
            $('.delete-button').trigger(getTodos())
          }
          else alertify.alert('Sorry, your connection to database is interrupted');
        })
        .fail(err => {
          alertify.alert('Sorry, your connection to database is interrupted');
        })
    }, () => {
      console.log('Cancel')
    })
  }
  
  $('#create-form input').keyup(function () {
    $('.error-message').slideUp()
  })