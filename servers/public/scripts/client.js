console.log('hello world');

$(document).ready(onReady);

function onReady(){
    console.log("client.js ready");
    getList()
}

/**
 * function that will call the server to show 
 * the lists
 */
function getList(){
    console.log("in getList");
    $.ajax({
        type: 'GET',
        url: '/list'
    })
}

function sendListToServer() {
    console.log('in send list');
    $.ajax({
      type: 'POST',
      url: '/list',
      data: {
        task: $('#taskToDo').val();
      }
    }).then( function (response) {
        console.log('response');
        getTask(); // need to create, will display the list on the DOM
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
  }