$(document).ready(getTaskFromLocalStorage);

function generateHTMLCard(card) {
  return `<div id="${card.id}" class="card-container">
            <p class = "title-of-card" contenteditable=true onfocusout=updateTaskTitle(event)> ${card.title}<button class="delete-button"></button> </p>
            <p class="task-of-card" contenteditable=true onfocusout=updateTaskBody(event)> ${card.body} </p> 
            <p class="card-buttons"> 
              <button class="upvote"></button> <button class="downvote"></button> 
              <span class="importance"> importance: <span class="importanceVariable"> ${card.importance} </span> </span>
            <button class="completed-task-button">Completed Task</button></p>`
};

function submitTask(event){
  event.preventDefault();
  var timeStamp = Date.now();
  var card = new Card(timeStamp, $('.title-input').val(), $('.task-input').val());
  var cardHTML = generateHTMLCard(card);
  $( ".bottom-box" ).prepend(cardHTML);   
  localStoreCard(card);
  resetForm();
};

function Card (id, title, body, importance) {
  this.title = title;
  this.body = body;
  this.importance = "normal";
  this.id = id;
  this.completedTask = false; 
  return this;
};

$('.save-btn').on('click', submitTask); 
$('.task-input').on('keyup', enableSubmitButton);
$('.show-all-completed').on('click', showCompletedTodos);
$('.bottom-box').on('click', cardChanges);
$('.filter-input').on('keyup', filterTasks);

function enableSubmitButton() {
  if ($('.title-input').val() === "" || $('.task-input').val() === "") {
   $('.save-btn').attr('disabled', true);
  } else {
    $('.save-btn').attr('disabled', false);
  };
};

function completedTask(event) {
  var completedTaskCard = $(event.target).closest('.card-container');
  completedTaskCard.toggleClass('completed-task');
  var timeStamp = completedTaskCard.attr('id');
  var storedTask = JSON.parse(localStorage.getItem(timeStamp));
  storedTask.completedTask = !storedTask.completedTask;
  localStoreCard(storedTask);
};

function resetForm() {
  $('.title-input').val('');
  $('.task-input').val('');
  enableSubmitButton();
};

function deleteCard() {
  $(event.target).closest('.card-container').remove();
  deleteFromLocalStorage();
}

function cardChanges(event) {
  if (event.target.className === "delete-button") {
    deleteCard();
  } if (event.target.className === "upvote") {
    $($(event.target).siblings('.importance').children()[0]).text(upVoteImportance(event));
    updateStoredimportance(event);
  } if (event.target.className === "downvote") {
    $($(event.target).siblings('.importance').children()[0]).text(downVoteImportance(event));
    updateStoredimportance(event);
  } if (event.target.className === "completed-task-button") {
    completedTask(event);
  }
};

function upVoteImportance(event){
  var $currentimportance = $($(event.target).siblings('.importance').children()[0]).text().trim();
  var importanceArr = ["none", "low", "normal", "high", "critical"];
  for (var i=0; i<importanceArr.length; i++){
    if ($currentimportance === importanceArr[i]){
      return $currentimportance = importanceArr[i+1];
    }
  }
};

function downVoteImportance(event){
  var $currentimportance = $($(event.target).siblings('.importance').children()[0]).text().trim();
  var importanceArr = ["none", "low", "normal", "high", "critical"];
    for (var i =0; i < importanceArr.length; i++) {
      if ($currentimportance === importanceArr[i]) {
        return $currentimportance = importanceArr[i-1];
    }
  }
};

function updateStoredimportance(event) {
  var timeStamp = $(event.target).closest('.card-container').attr('id');
  var storedTask = JSON.parse(localStorage.getItem(timeStamp));
  var $currentimportance = $($(event.target).siblings('.importance').children()[0]);
  storedTask.importance = $currentimportance.text();
  var stringifiedstoredTask = JSON.stringify(storedTask);
  localStorage.setItem(timeStamp, stringifiedstoredTask);
};

function deleteFromLocalStorage() {
   var timeStamp = $(event.target).closest('.card-container').attr('id');
   localStorage.removeItem(timeStamp);
};

function localStoreCard(card) {
    var cardString = JSON.stringify(card);
    localStorage.setItem(card.id, cardString);
};

function getTaskFromLocalStorage() {
  for (var i=0; i<localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var stringifiedTask = localStorage.getItem(timeStamp)
    var parsedTaskToDisplay= JSON.parse(stringifiedTask);
    var cardHTML = generateHTMLCard(parsedTaskToDisplay);
    if (parsedTaskToDisplay.completedTask === false) {    
      $( ".bottom-box").prepend(cardHTML);   
    }
  }
};

function filterTasks() {
  var filterInput = $('.filter-input').val().toLowerCase();
  var allTasks = $('.card-container');
  for (var i=0; i < allTasks.length; i++) {
    var taskTitle = $(allTasks[i]).children('.title-of-card').text().toLowerCase();
    var taskBody = $(allTasks[i]).children('.task-of-card').text().toLowerCase();
    if (taskTitle.includes(filterInput) || taskBody.includes(filterInput)) {
      $(allTasks[i]).removeClass('hidden');
    } else {
      $(allTasks[i]).addClass('hidden');
    }
  }
};

function updateTaskTitle(event){
  var currentTimeStamp = $(event.target).closest('.card-container').attr('id');
  var updatedTitle = $(event.target).text();
  var storedTask = JSON.parse(localStorage.getItem(currentTimeStamp));
  storedTask.title = updatedTitle;
  var stringifiedstoredTask = JSON.stringify(storedTask);
  localStorage.setItem(currentTimeStamp, stringifiedstoredTask);
};

function updateTaskBody(event){
  var currentTimeStamp = $(event.target).closest('.card-container').attr('id');
  var updatedBody = $(event.target).text();
  var storedTask = JSON.parse(localStorage.getItem(currentTimeStamp));
  storedTask.body = updatedBody;
  var stringifiedstoredTask = JSON.stringify(storedTask);
  localStorage.setItem(currentTimeStamp, stringifiedstoredTask);
};

function showCompletedTodos(event) {
  event.preventDefault();
  for (var i=0; i<localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var stringifiedTask = localStorage.getItem(timeStamp);
    var parsedTaskToDisplay= JSON.parse(stringifiedTask);
    var cardHTML = generateHTMLCard(parsedTaskToDisplay);
    if (parsedTaskToDisplay.completedTask === true) {    
     $( ".bottom-box" ).prepend(cardHTML);   
     $('#'+timeStamp).addClass('completed-task');
    }
  }

};








