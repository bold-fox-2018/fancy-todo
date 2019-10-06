function showMyTodo () {
  $('#content').empty();
  if(myLineChart){
    destroyChart();
  }
  showToDoForm('#users-content');
}

function showAllProjects () {
  $('#content').empty();
  if(myLineChart){
    destroyChart();
  }
  showPickProject();
}

function showHide(shows, hides) {
  for(let i = 0; i < shows.length; i++) {
    $(shows[i]).show();
  }
  for(let i = 0; i < hides.length; i++) {
    $(hides[i]).hide();
  }
}

function showHomePage() {
  $('#content').empty();
  if(myLineChart){
    destroyChart();
  }
  $('#content').append(`
    <center>
      <img src="./homePage.svg" alt="Home Page" style="height:50vh; margin-top:20vh; max-height:50vh; overflow: hidden;">
    </center>`)
}

function loading(status) {
  if(status === 'start') {
    $('#loading').append(`
      <center>
        <img id="chocobo" src="./chocoLoad.gif" alt="Home Page" style="height:50vh; margin-top:20vh; max-height:50vh; overflow: hidden;">
      </center>
    `)
  } else if (status === 'stop') {
    $('#loading').empty()
  }
}