$(document).ready(getTaskFromLocalStorage);


//this function is creating a new card using the parameters 
function generateHTMLCard(card) {
  return `<div id="${card.id}" class="card-container">
            <p class = "title-of-card" contenteditable=true onfocusout=updateTaskTitle(event)> ${card.title}<button class="delete-button"></button> </p>
            <p class="task-of-card" contenteditable=true onfocusout=updateTaskBody(event)> ${card.body} </p> 
            <p class="card-buttons"> 
                <button class="upvote"></button> <button class="downvote"></button> 
                <span class="quality"> quality: <span class="qualityVariable"> ${card.quality} </span> </span>
            </p>`
};

$('.save-btn').on('click', submitTask); 
$('.title-input').on('keyup', enableSubmitButton);
$('.task-input').on('keyup', enableSubmitButton);


function enableSubmitButton(){
  if ($('.title-input').val() === "" || $('.task-input').val() === ""){
   $('.save-btn').attr('disabled', true);
  } else {
    $('.save-btn').attr('disabled', false);
  }
}

function submitTask(event){
  event.preventDefault();
  var timeStamp = Date.now();
  var card = new Card(timeStamp, $('.title-input').val(), $('.task-input').val());
  var cardHTML = generateHTMLCard(card);
  $( ".bottom-box" ).prepend(cardHTML);   
  localStoreCard(card);
  resetForm();
}

function resetForm() {
  $('.title-input').val('');
  $('.task-input').val('');
  enableSubmitButton();
}

$('.bottom-box').on('click', cardChanges)

function cardChanges(event) {
  if (event.target.className === "delete-button") {
    deleteCard();
  }
  if (event.target.className === "upvote") {
    changeQualityUp();
  }
  if (event.target.className === "downvote") {
    changeQualityDown();
  }
}

function deleteCard() {
  $(event.target).closest('.card-container').remove();
  deleteFromLocalStorage();
}

function changeQualityUp() {
  var $currentQuality = $($(event.target).siblings('.quality').children()[0]);
  if ($currentQuality.text().trim() === 'swill'){
    $currentQuality.text('plausible');
  } else {
    $currentQuality.text('genius');
  }
  updateStoredQuality(event);
}

function changeQualityDown() {
  var $currentQuality = $($(event.target).siblings('.quality').children()[0]);
  if ($currentQuality.text().trim() === 'genius') {
    $currentQuality.text('plausible');
  } else {
    $currentQuality.text('swill')
  }
  updateStoredQuality(event);
}

function updateStoredQuality(event){
  var timeStamp = $(event.target).closest('.card-container').attr('id');
  var storedTask = JSON.parse(localStorage.getItem(timeStamp));
  var $currentQuality = $($(event.target).siblings('.quality').children()[0]);
  storedTask.quality = $currentQuality.text();
  var stringifiedstoredTask = JSON.stringify(storedTask);
  localStorage.setItem(timeStamp, stringifiedstoredTask);
}

function deleteFromLocalStorage(){
   var timeStamp = $(event.target).closest('.card-container').attr('id');
   localStorage.removeItem(timeStamp);
}

function Card (id, title, body, quality){
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
  this.id = id;
  return this;
}



function localStoreCard(card) {
    var cardString = JSON.stringify(card);
    localStorage.setItem(card.id, cardString);
}


function getTaskFromLocalStorage(){
  for (var i=0; i<localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var stringifiedTask = localStorage.getItem(timeStamp)
    var parsedTaskToDisplay= JSON.parse(stringifiedTask);
     var cardHTML = generateHTMLCard(parsedTaskToDisplay);
  $( ".bottom-box" ).prepend(cardHTML);   
  }
};

$('.filter-input').on('keyup', filterTasks);

function filterTasks(){
  var filterInput = $('.filter-input').val().toLowerCase();
  var allTasks = $('.card-container');
  for (var i=0; i < allTasks.length; i++) {
    var taskTitle = $(allTasks[i]).children('.title-of-card').text().toLowerCase();
    var taskBody = $(allTasks[i]).children('.task-of-card').text().toLowerCase();
      if (taskTitle.includes(filterInput) || taskBody.includes(filterInput)){
        $(allTasks[i]).removeClass('hidden');
      }
      else {
      $(allTasks[i]).addClass('hidden');
      }
    }
  }

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









