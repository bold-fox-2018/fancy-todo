//swal notif
function notif(position, type, title, timer = 1500) {
  Swal.fire({
    position: position,
    type: type,
    title: title,
    showConfirmButton: false,
    timer: timer
  })
}

const url = `http://35.198.213.51`;
let user = {};
let allToDoList = [];
let sortedList = [];
let allToDoProjectList = [];
let sortedProjectList = [];
let allProjects = [];
let allInvitations = [];
let selectedProject = {};

let updateId = '';
let currentList = '';
let updateOrDeleteId = '';
let currentSorted = '';

let myLineChart = null;

$(document).ready(function() {
  $('#content').append(`
    <center>
      <img src="./homePage.svg" alt="Home Page" style="height:50vh; margin-top:20vh; max-height:50vh; overflow: hidden;">
    </center>`)
})