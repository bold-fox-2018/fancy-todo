async function readTodo(type) {
  if (type === 'personal') {
    await $.ajax({
      url: `${url}/todo`,
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(response => {
        allToDoList = response;
        sortedList = allToDoList.slice(0);
      })
      .fail(response => {
        if (response.responseJSON.err == `User Login Have Been Changed, Please Login Again`) {
          signOut();
          notif('top-start', 'error', response.responseJSON.err);
        }
        else {
          notif('top-end', 'error', response.responseJSON.err);
        }
      })
  } else if (type === 'project') {
    await $.ajax({
      url: `${url}/project`,
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(response => {
        allProjects = response;
      })
      .fail(response => {
        if (response.responseJSON.err == `User Login Have Been Changed, Please Login Again`) {
          signOut();
          notif('top-start', 'error', response.responseJSON.err);
        }
        else {
          notif('top-end', 'error', response.responseJSON.err);
        }
      })
  } else {
    notif('top-end', 'error', 'wrong input in read todo');
  }
}

async function getInvitation() {
  await $.ajax({
    url: `${url}/project/invitation`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      allInvitations = response;
      showInvitation();
    })
    .fail(response => {
      if (response.responseJSON.err == `User Login Have Been Changed, Please Login Again`) {
        signOut();
        notif('top-start', 'error', response.responseJSON.err);
      }
      else {
        notif('top-end', 'error', response.responseJSON.err);
      }
    })
}

function showInvitation() {
  let makeInvitations = '';
  for (let i = 0; i < allInvitations.length; i++) {
    makeInvitations += `
      <div id="#${allInvitations[i]._id}">
        <div class="card w-75 mx-auto" style="margin-top:50px">
          <div class="card-body">
            <h5 class="card-title">Invitation To Project</h5>
            <p class="card-text">You've been invited to project with name ${allInvitations[i].name}</p>
            <a href="#" class="btn btn-success" onclick="acceptInvitation('${allInvitations[i]._id}')">Accept</a>
            <a href="#" class="btn btn-danger" onclick="declineInvitation('${allInvitations[i]._id}')">Decline</a>
          </div>
        </div>
      </div>`;
  }
  $('#content-invite').append(makeInvitations)
}

async function acceptInvitation(projectId) {
  await $.ajax({
    url: `${url}/project/accept/${projectId}`,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      for (let i = 0; i < allInvitations.length; i++) {
        if (allInvitations[i]._id.toString() === response._id) {
          allInvitations.splice(i, 1);
          break;
        }
      }
      notif('top-end', 'success', `You successfully join project ${response.name}`)
      $('#content-invite').empty();
      allProjects.push(response);
      showInvitation();
    })
    .fail(response => {
      if (response.responseJSON.err == `User Login Have Been Changed, Please Login Again`) {
        signOut();
        notif('top-start', 'error', response.responseJSON.err);
      }
      else {
        notif('top-end', 'error', response.responseJSON.err);
      }
    })
}

async function declineInvitation(projectId) {
  await $.ajax({
    url: `${url}/project/decline/${projectId}`,
    method: 'PATCH',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      for (let i = 0; i < allInvitations.length; i++) {
        if (allInvitations[i]._id.toString() === response._id) {
          allInvitations.splice(i, 1);
          break;
        }
      }
      $('#content-invite').empty();
      notif('top-end', 'success', `You decline to join project ${response.name}`)
      showInvitation();
    })
    .fail(response => {
      if (response.responseJSON.err == `User Login Have Been Changed, Please Login Again`) {
        signOut();
        notif('top-start', 'error', response.responseJSON.err);
      }
      else {
        notif('top-end', 'error', response.responseJSON.err);
      }
    })
}

function showToDoForm(todoType) {
  let currentTodo = ''
  if (todoType === '#users-content') {
    currentTodo = 'Own';
    $('#projectList').remove();
  } else if (todoType === '#projects-content') {
    currentTodo = 'Project';
  }
  if (allInvitations) {
    $('#content-invite').empty();
    showInvitation();
  }
  $('#todo').remove();
  $('#content').append(`
    <div id="todo">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">${currentTodo} To Do Form 
                <button class="show-hide" id="show-create" onclick="showHide(['#hide-create', '#form-todo'], ['#show-create'])"> + </button>
                <button class="show-hide" id="hide-create" onclick="showHide(['#show-create'], ['#hide-create', '#form-todo'])"> - </button>
              </h5>

              <form id="form-todo" class="form-signin" onsubmit="createTodo('${todoType}')">
                <div class="form-label-group">
                  <input type="text" id="todoName" class="form-control" placeholder="To Do Name" required autofocus>
                  <label for="todoName">To Do Name</label>
                </div>

                <div class="form-label-group">
                  <input type="text" id="description" class="form-control" placeholder="Description" required autofocus>
                  <label for="description">Description</label>
                </div>

                <div class="form-label-group">
                  <input type="date" id="dueDate" class="form-control" placeholder="Due Date" required autofocus>
                  <label for="dueDate">Due Date</label>
                </div>
  
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Create a To Do</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div id="sortList">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">Sorted ${currentTodo} To Do
                  <button class="show-hide" id="show-sort" onclick="showHide(['#hide-sort', '#sort-own-form-todo'], ['#show-sort'])"> + </button>
                  <button class="show-hide" id="hide-sort" onclick="showHide(['#show-sort'], ['#hide-sort', '#sort-own-form-todo'])"> - </button>
                </h5>
                <form id="sort-own-form-todo" class="form-signin" onsubmit="sortToDo('${todoType}')">
                  <select id="sort-own-option" class="form-control select-sort" name="sort-own-todo">
                    <option value="newUpdated">New Updated</option>
                    <option value="dueDateAsc">Due Date Ascending</option>
                    <option value="dueDateDesc">Due Date Descending</option>
                    <option value="complete">Complete</option>
                    <option value="uncomplete">Uncomplete</option>
                    <option value="nameAsc">Name Ascending</option>
                    <option value="nameDesc">Name Descending</option>
                  </select>
                  <br> 
                  <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Sort</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="todoList">
      </div>
    </div>
  `);
  $('#show-create').hide();
  $('#show-sort').hide();
  $('#form-todo').on('submit', function (event) {
    event.preventDefault();
  })
  $('#sort-own-form-todo').on('submit', function (event) {
    event.preventDefault();
  })
  if (todoType === '#users-content') {
    appendTodo(todoType, sortedList);
  } else if (todoType === '#projects-content') {
    appendTodo(todoType, allToDoProjectList);
  }
}

function appendTodo(todoType, list) {
  if (todoType === 'filter') {
    $('#content').empty();
    $('#content').append(
      `<div id="todoList"></div>`);
  } else {
    $('#allToDoList').remove();
  }
  $('#todoList').append('<div id="allToDoList" class="row"></div>');
  for (let i = list.length - 1; i >= 0; i--) {
    $('#allToDoList').append(`
      <div id="${list[i]._id}" class="col-sm-12 col-md-6 col-lg-3 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <div class="form-label-group">
              <input type="text" class="form-control" placeholder="To Do Name" autofocus readonly value="${list[i].name}">
              <label>To Do Name</label>
            </div>
            <div class="form-label-group">
              <input type="text" class="form-control" placeholder="Description" autofocus readonly value="${list[i].description}">
              <label>Description</label>
            </div>
            <div class="form-label-group">
              <input type="text" class="form-control" placeholder="Status" autofocus readonly value="${list[i].status}">
              <label>Status</label>
            </div>
            <div class="form-label-group">
              <input type="date" class="form-control" placeholder="To Do Name" autofocus readonly value="${list[i].dueDate}">
              <label>Due Date</label>
            </div>` + (list[i].type ?
        `<div class="form-label-group">
              <input type="text" class="form-control" placeholder="Type" autofocus readonly value="${list[i].type}">
              <label>Type</label>
            </div>`
        : '') + `
            <button id="update" class="btn btn-lg btn-primary btn-block text-uppercase" onclick="showUpdateForm('${todoType}', '${list[i]._id}', '${i}')">Update</button>
            <button id="remove" class="btn btn-lg btn-danger btn-block text-uppercase" onclick="showRemoveForm('${todoType}', '${list[i]._id}', '${i}')">Remove</button>
          </div>
        </div>
      </div>
    `)
  }
  if (myLineChart) {
    destroyChart();
  }
  if (todoType === '#users-content') {
    createChart(allToDoList);
  } else if (todoType === '#projects-content') {
    createChart(allToDoProjectList);
  }
}

function createTodo(todoType) {
  if (todoType === '#users-content') {
    $.ajax({
      url: `${url}/todo`,
      method: 'POST',
      data: {
        name: $('#todoName').val(),
        description: $('#description').val(),
        dueDate: $('#dueDate').val()
      },
      headers: {
        token: localStorage.getItem('token'),
        userId: user._id
      }
    })
      .done(response => {
        notif('top-end', 'success', 'To Do Added to the List');
        sortedList.push(response);
        allToDoList.push(response)
        appendTodo('#users-content', allToDoList);
        $('#todoName').val(''),
          $('#description').val(''),
          $('#dueDate').val('')
      })
      .fail(response => {
        notif('top-end', 'error', response.responseJSON.err)
      })
  } else if (todoType === '#projects-content') {
    $.ajax({
      url: `${url}/todo/project/${selectedProject}`,
      method: 'POST',
      data: {
        name: $('#todoName').val(),
        description: $('#description').val(),
        dueDate: $('#dueDate').val()
      },
      headers: {
        token: localStorage.getItem('token'),
        userId: user._id
      }
    })
      .done(response => {
        notif('top-end', 'success', 'To Do Added to the List');
        sortedProjectList.push(response);
        allToDoProjectList.push(response)
        appendTodo('#projects-content', allToDoProjectList);
        $('#todoName').val(''),
          $('#description').val(''),
          $('#dueDate').val('')
      })
      .fail(response => {
        notif('top-end', 'error', response.responseJSON.err)
      })
  }
}

function showUpdateForm(todoType, id, index) {
  updateId = updateId || null;
  cancelEditOrDelete();
  updateId = id;
  let updateData = {};
  currentList = $(`#${updateId}`);
  if (todoType === '#users-content') {
    updateData = sortedList.slice(index)[0];
  } else if (todoType === '#projects-content') {
    updateData = sortedProjectList.slice(index)[0];
  }
  const formEditOrDelete = `
    <div id="${updateId}">
      <div class="col mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <form id="form-todo-update" class="form-signin">
              <div class="form-label-group">
                <input id=updateName type="text" class="form-control" value="${updateData.name}" required autofocus>
                <label for="todoName">To Do Name</label>
              </div>

              <div class="form-label-group">
                <input id=updateDescription type="text" id="description" class="form-control" value="${updateData.description}" required autofocus>
                <label for="description">Description</label>
              </div>

              <div id="status">
                <div class="form-check-inline">
                  <label class="form-check-label" for="status">Complete
                    <input type="radio" class="form-check-input" value="complete" required name="optCreateStatus" ${updateData.status === 'complete' ? 'checked' : ''}>
                  </label>  
                </div>

                <div class="form-check-inline">
                  <label class="form-check-label" for="status">Uncomplete
                    <input type="radio" id="status" class="form-check-input" value="uncomplete"  required name="optCreateStatus" ${updateData.status === 'uncomplete' ? 'checked' : ''}>
                  </label>  
                </div>
              </div>

              <div class="form-label-group">
                <input id=updateDueDate type="date" id="dueDate" class="form-control" value="${updateData.dueDate}" required autofocus>
                <label for="dueDate">Due Date</label>
              </div>
              
              <h5 class="card-title text-center">Want To Update?</h5>
              <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit" onclick="update('${todoType}', '${index}')">Update</button>
              <button type="button" id="cancelChange" class="btn btn-lg btn-danger btn-block text-uppercase" onclick="cancelEditOrDelete()">Cancel</button>
            </form>
          </div>
        </div>
      </div> 
    </div>`;
  $('#form-todo-update').submit(function (event) {
    event.preventDefault();
  })
  $(currentList).replaceWith(formEditOrDelete);
}

function cancelEditOrDelete() {
  $(`#${updateId}`).replaceWith(currentList);
  updateId = '';
}

function update(todoType, index) {
  $('#form-todo-update').on('submit', function (event) {
    event.preventDefault();
  })
  if (todoType === '#users-content') {
    $.ajax({
      url: `${url}/todo/${updateId}`,
      method: 'PATCH',
      data: {
        name: $('#updateName').val(),
        description: $('#updateDescription').val(),
        status: $("input[name='optCreateStatus']:checked").val(),
        dueDate: $('#updateDueDate').val(),
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(response => {
        notif('top-end', 'success', 'List Have Been Update');
        sortedList.splice(index, 1);
        sortedList.push(response);
        allToDoList.splice(allToDoList.map(list => list._id).indexOf(updateId), 1);
        allToDoList.push(response);
        appendTodo(todoType, sortedList);
      })
      .fail(response => {
        notif('top-end', 'error', response.responseJSON.err)
      })
  } else if (todoType === '#projects-content') {
    $.ajax({
      url: `${url}/todo/project/${selectedProject}/${updateId}`,
      method: 'PATCH',
      data: {
        name: $('#updateName').val(),
        description: $('#updateDescription').val(),
        status: $("input[name='optCreateStatus']:checked").val(),
        dueDate: $('#updateDueDate').val(),
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(response => {
        notif('top-end', 'success', 'List Have Been Update');
        sortedProjectList.splice(index, 1);
        sortedProjectList.push(response);
        allToDoProjectList.splice(allToDoProjectList.map(list => list._id).indexOf(updateId), 1);
        allToDoProjectList.push(response);
        appendTodo(todoType, sortedProjectList);
      })
      .fail(response => {
        notif('top-end', 'error', response.responseJSON.err)
      })
    appendTodo(todoType, allToDoProjectList);
  }

}

function showRemoveForm(todoType, id, index) {
  let currentData = '';
  if (todoType === '#users-content') {
    currentData = sortedList.slice(index)[0];
  } else if (todoType === '#projects-content') {
    currentData = sortedProjectList.slice(index)[0];
  }
  updateId = updateId || null;
  cancelEditOrDelete();
  updateId = id;
  currentList = $(`#${updateId}`);
  const formEditOrDelete = `
    <div id="${updateId}">
      <div class="col mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <div class="form-label-group">
              <input type="text" class="form-control" placeholder="To Do Name" autofocus readonly value="${currentData.name}">
              <label>To Do Name</label>
            </div>
            <div class="form-label-group">
              <input type="text" class="form-control" placeholder="Description" autofocus readonly value="${currentData.description}">
              <label>Description</label>
            </div>
            <div class="form-label-group">
              <input type="text" class="form-control" placeholder="Status" autofocus readonly value="${currentData.status}">
              <label>Status</label>
            </div>
            <div class="form-label-group">
              <input type="date" class="form-control" placeholder="To Do Name" autofocus readonly value="${currentData.dueDate}">
              <label>Due Date</label>
            </div>
            <h5 class="card-title text-center">Want To Delete?</h5>
            <button type="button" id="deleteToDo" class="btn btn-lg btn-danger btn-block text-uppercase" onclick="remove('${todoType}', '${index}')">Yes</button>
            <button type="button" id="cancelChange" class="btn btn-lg btn-primary btn-block text-uppercase" onclick="cancelEditOrDelete()">No</button>
          </div>
        </div> 
      </div>
    </div>`
  $(currentList).replaceWith(formEditOrDelete);
}

function remove(todoType, index) {
  if (todoType === '#users-content') {
    $('#deleteToDo').on('click', function (event) {
      event.preventDefault();
    })
    $.ajax({
      url: `${url}/todo/${updateId}`,
      method: 'DELETE',
      headers: {
        token: localStorage.getItem('token'),
        userId: user._id
      }
    })
      .done(response => {
        notif('top-end', 'success', response);
        sortedList.splice(index, 1);
        allToDoList.splice(allToDoList.map(list => list._id).indexOf(updateId), 1);
        appendTodo(todoType, sortedList);
      })
      .fail(response => {
        notif('top-end', 'error', response.responseJSON.err)
      })
  } else if (todoType === '#projects-content') {
    $('#deleteToDo').on('click', function (event) {
      event.preventDefault();
    })
    $.ajax({
      url: `${url}/todo/project/${selectedProject}/${updateId}`,
      method: 'DELETE',
      headers: {
        token: localStorage.getItem('token'),
        userId: user._id
      }
    })
      .done(response => {
        notif('top-end', 'success', response);
        sortedProjectList.splice(index, 1);
        allToDoProjectList.splice(allToDoProjectList.map(list => list._id).indexOf(updateId), 1);
        appendTodo(todoType, sortedProjectList);
      })
      .fail(response => {
        notif('top-end', 'error', response.responseJSON.err)
      })
  }

}

function searchToDo() {
  let personalSearch = allToDoList
    .filter(todo => (todo.name.indexOf($('#input-search').val()) + 1))
    .map(todo => {
      todo.type = 'personal'
      return todo
    });
  let projectSearch = allToDoProjectList
    .filter(todo => (todo.name.indexOf($('#input-search').val()) + 1))
    .map(todo => {
      todo.type = 'project'
      return todo
    });;
  let searchedTodo = personalSearch.concat(projectSearch)
  if (searchedTodo.length) {
    appendTodo('filter', searchedTodo);
    notif('top-start', 'success', 'To Do Found');
    $('#input-search').val('');
  } else {
    notif('top-start', 'error', "To Do Didn't Found")
  }
}

function sortToDo(todoType) {
  const option = $('#sort-own-option').val();
  currentSorted = currentSorted || 'newUpdated';
  if (todoType === '#users-content') {
    sortedList = sortingLogic(sortedList, allToDoList, option);
    appendTodo(todoType, sortedList);
  } else if (todoType === '#projects-content') {
    allToDoProjectList = sortingLogic(sortedProjectList, allToDoProjectList, option);
    appendTodo(todoType, allToDoProjectList);
  }
}

function sortingLogic(list, mainList, option) {
  if (option === 'newUpdated') {
    list = mainList.slice(0);
  } else if (option === 'dueDateAsc') {
    list = manualSort(list, 'dueDate', 'asc');
  } else if (option === 'dueDateDesc') {
    list = manualSort(list, 'dueDate', 'desc');
  } else if (option === 'complete') {
    list = manualSort(list, 'status', 'asc');
  } else if (option === 'uncomplete') {
    list = manualSort(list, 'status', 'desc');
  } else if (option === 'nameAsc') {
    list = manualSort(list, 'name', 'asc');
  } else if (option === 'nameDesc') {
    list = manualSort(list, 'name', 'desc');
  }
  notif('top-end', 'success', 'Sorted Own List Success');
  return list;
}

function manualSort(array, key, option) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (option === 'desc') {
        if (array[i][key] > array[j][key]) {
          let temp = array[i][key];
          array[i][key] = array[j][key];
          array[j][key] = temp;
        }
      } else if (option === 'asc') {
        if (array[i][key] < array[j][key]) {
          let temp = array[i][key];
          array[i][key] = array[j][key];
          array[j][key] = temp;
        }
      }
    }
  }
  return array;
}

function createChart(list) {
  myLineChart = new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Complete", "Uncomplete"],
      datasets: [
        {
          label: "To Do (Count)",
          backgroundColor: ["skyblue", "orange"],
          data: [list.map(data => data.status === 'complete').filter(data => data).length, list.map(data => data.status === 'uncomplete').filter(data => data).length]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Statistical Completion To Do History'
      }
    }
  });
}

function destroyChart() {
  myLineChart.destroy();
}

function showPickProject() {
  $('#content').append(`
    <div id="projectList">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Create Project
              <button class="show-hide" id="show-create-project" onclick="showHide(['#hide-create-project', '#create-project'], ['#show-create-project'])"> + </button>
                <button class="show-hide" id="hide-create-project" onclick="showHide(['#show-create-project'], ['#hide-create-project', '#create-project'])"> - </button>
              </h5>
              <form id="create-project" class="form-signin" onsubmit="createProject()">
                <div class="form-label-group">
                  <input type="text" id="projectName" class="form-control" placeholder="Project Name" required autofocus>
                  <label for="projectName">Project Name</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Create New Project</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Filter Project Job
              <button class="show-hide" id="show-filter-project" onclick="showHide(['#hide-filter-project', '#select-project'], ['#show-filter-project'])"> + </button>
                <button class="show-hide" id="hide-filter-project" onclick="showHide(['#show-filter-project'], ['#hide-filter-project', '#select-project'])"> - </button>
              </h5>
              <div id="select-project">
                <select id="sort-project-option" class="form-control select-sort" name="sort-project-todo">
                </select>
                <br> 
                <button type="button" id="select-project-button" class="btn btn-lg btn-success btn-block text-uppercase" onclick="selectProject()">Select Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="projectWindow">
      </div>
    </div>`)
  let projectOptions = ``;
  $('#show-create-project').hide();
  $('#show-filter-project').hide();
  for (let i = 0; i < allProjects.length; i++) {
    projectOptions += `<option value="${allProjects[i]._id}">${allProjects[i].name}</option>`
  }
  $('#sort-project-option').append(projectOptions);
  $('#create-project').submit(function (event) {
    event.preventDefault();
  })
  $('#sort-project-option').submit(function (event) {
    event.preventDefault();
  })
}

function selectProject() {
  if (myLineChart) {
    destroyChart();
  }
  selectedProject = $('#sort-project-option').val();
  let project = allProjects.filter(project => project._id.toString() === selectedProject.toString())[0];
  allToDoProjectList = project.todos;
  sortedProjectList = allToDoProjectList.slice(0);
  showToDoForm('#projects-content');
  let allMembers = project.members;
  let displayMembers = ``;
  for (let i = 0; i < allMembers.length; i++) {
    displayMembers += `
    <div class="form-label-group">
      <input type="text" class="form-control" placeholder="Members Name" readonly required autofocus value="${allMembers[i].name}">
      <label for="membersName">Members Name</label>
    </div>`
  }
  let allInvited = project.invite;
  let displayInvited = ``;
  for (let i = 0; i < allInvited.length; i++) {
    displayInvited += `
    <div class="form-label-group">
      <input type="text" class="form-control" placeholder="Members Name" readonly required autofocus value="${allInvited[i].name}">
      <label for="membersName">Members Name</label>
    </div>`
  }
  $('#projectWindow').empty();
  $('#projectWindow').append(`
    <div id="memberList">
      <div class="jumbotron">
        <center>
          <h3>${project.name} Project</h3>
        </center>
      </div>
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-4 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Member List
              <button class="show-hide" id="show-member-list" onclick="showHide(['#hide-member-list', '#member-list'], ['#show-member-list'])"> + </button>
                <button class="show-hide" id="hide-member-list" onclick="showHide(['#show-member-list'], ['#hide-member-list', '#member-list'])"> - </button>
              </h5>
              <form id="member-list" class="form-signin"">
                ${displayMembers}
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-9 col-md-7 col-lg-4 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Invite List
              <button class="show-hide" id="show-invite-list" onclick="showHide(['#hide-invite-list', '#invite-list'], ['#show-invite-list'])"> + </button>
                <button class="show-hide" id="hide-invite-list" onclick="showHide(['#show-invite-list'], ['#hide-invite-list', '#invite-list'])"> - </button>
              </h5>
              <form id="invite-list" class="form-signin" onsubmit="createProject()">
                ${displayInvited}
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm-9 col-md-7 col-lg-4 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Invite New Members
              <button class="show-hide" id="show-invite-new-members" onclick="showHide(['#hide-invite-new-members', '#invite-new-members'], ['#show-invite-new-members'])"> + </button>
                <button class="show-hide" id="hide-invite-new-members" onclick="showHide(['#show-invite-new-members'], ['#hide-invite-new-members', '#invite-new-members'])"> - </button>
              </h5>
              <form id="invite-new-members" class="form-signin" onsubmit="inviteNewMember('${project._id}')">
                <div class="form-label-group">
                  <input type="text" id="newMemberEmail" class="form-control" placeholder="Email" required autofocus>
                  <label for="newMemberEmail">Email</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Invited New Member</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`)
  $('#show-member-list').hide();
  $('#show-invite-list').hide();
  $('#show-invite-new-members').hide();
  $('#invite-new-members').submit(function (event) {
    event.preventDefault();
  });
}

function createProject() {
  $.ajax({
    url: `${url}/project`,
    method: 'POST',
    data: {
      name: $('#projectName').val()
    },
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(response => {
      notif('top-end', 'success', 'Added New Project');
      $('#projectName').val('');
      $('#sort-project-option').append(`<option value="${response._id}">${response.name}</option>`);
      allProjects.push(response);
    })
    .fail(response => {
      notif('top-end', 'error', response.responseJSON.err)
    })
}

function inviteNewMember(projectId) {
  $.ajax({
    url: `${url}/project/invite/${projectId}`,
    method: 'PATCH',
    data: {
      email: $('#newMemberEmail').val()
    },
    headers: {
      token: localStorage.getItem('token'),
      userId: user._id
    }
  })
    .done(response => {
      notif('top-end', 'success', `${$('#newMemberEmail').val()} Has Been Added To Project`);
      $('#newMemberEmail').val('');
      $('#sort-project-option').append(`<option value="${response._id}">${response.name}</option>`);
      for (let i = 0; i < allProjects.length; i++) {
        if (allProjects[i]._id.toString() === projectId.toString()) {
          allProjects[i].invite.push(response)
          break;
        }
      }
      $('#invite-list').append(`
        <div class="form-label-group">
          <input type="text" class="form-control" placeholder="Members Name" readonly required autofocus value="${response.name}">
          <label for="membersName">Members Name</label>
        </div>`)
    })
    .fail(response => {
      notif('top-end', 'error', response.responseJSON.err)
    })
}