console.log('hello world');

$(document).ready(onReady);

function onReady(){
    console.log("client.js ready");
    $('#addTask').on('click',  sendListToServer);
    $('body').on('click', '.task-delete', deleteTask);
    $('body').on('click', '.task-complete', completeTask);
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
                <td> <button class="task-delete" data-id="${newTask.id}"> delete </button>
                     <button class="task-complete" data-id="${newTask.id}"> complete </button>
                </td> 
                </tr>
            `);
        } 
    }).catch(function (error) {
        console.log("getList error", error);
        alert('something is wrong in the get function');
    })
}


function completeTask(){
    console.log("task is done!");
    const taskId = $(this).data('id');
    console.log('task is done', taskId);
    $.ajax({
        type: 'PUT',
        url: `/list/${taskId}`,
        data: { 
            task: 'New task'
        } 
    }).then(function(response){
        console.log("response in complete function", response)
        getTask();
    }).catch(function(error) {
        console.log(error);
        alert('Something went wrong in the complete task');
    })
}


function deleteTask(){
    const taskId = $(this).data('id');
    console.log("this is the task id", taskId);
    $.ajax({
        type:'DELETE',
        url:`/list/${taskId}`
    }).then(function(response){
        console.log("this is the delete response", response);
        getList();
    }).catch(function(error){
        console.log("error in delete", error );
        alert('something wrong with the delete');
     })
}