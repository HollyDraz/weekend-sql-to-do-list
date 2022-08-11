console.log('hello world');

$(document).ready(onReady);

function onReady(){
    console.log("client.js ready");
    $('#addTask').on('click',  sendListToServer);
    //sendListToServer()
    getList();
}

function sendListToServer() {
    console.log('in send list');
    $.ajax({
      type: 'POST',
      url: '/list',
      data: {
        task: $('#taskToDo').val()

      }
    }).then( function (response) {
        console.log(response);
        getList(); // need to create, will display the list on the DOM
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong in post. Please try again.');
    });
  }



function getList(){
    console.log("in getList");
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function(response) {
        console.log("get list response", response);
        $('#viewListTable').empty();
        for(let i =0; i < response.length; i++) {
            let newTask = response[i];
            let rowClass = "default-row"
            if (newTask.complete){
                rowClass = "complete-row"
            }
            $('#viewListTable').append(`
                <tr class="${rowClass}">
                <td>${newTask.task}</td>
                </tr>
            
            `);
        }//add styling in here 
    }).catch(function (error) {
        console.log("getList error", error);
        alert('something is wrong in the get function');
    })
}