$(document).ready(getIdeaFromLocalStorage);
var numCards = 0;

//this function is creating a new card using the parameters 
function generateHTMLCard(card) {
  return `<div id="${card.id}" class="card-container">
            <p class = "title-of-card" contenteditable=true> ${card.title}<button class="delete-button"></button> </p>
            <p class="body-of-card" contenteditable=true> ${card.body} </p> 
            <p class="card-buttons"> 
                <button class="upvote"></button> <button class="downvote"></button> 
                <span class="quality"> quality: <span class="qualityVariable"> ${card.quality} </span> </span>
            </p>`
};

$('.save-btn').on('click', submitIdea); 
$('.title-input').on('keyup', enableSubmitButton);
$('.body-input').on('keyup', enableSubmitButton);


function enableSubmitButton(){
  if ($('.title-input').val() === "" || $('.body-input').val() === ""){
   $('.save-btn').attr('disabled', true);
  } else {
    $('.save-btn').attr('disabled', false);
  }
}

function submitIdea(event){
  event.preventDefault();
  var timeStamp = Date.now();
  var card = new Card(timeStamp, $('.title-input').val(), $('.body-input').val());
  var cardHTML = generateHTMLCard(card);
  $( ".bottom-box" ).prepend(cardHTML);   
  localStoreCard(card);
  resetForm();
}

function resetForm() {
  $('.title-input').val('');
  $('.body-input').val('');
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
  var storedIdea = JSON.parse(localStorage.getItem(timeStamp));
  var $currentQuality = $($(event.target).siblings('.quality').children()[0]);
  storedIdea.quality = $currentQuality.text();
  var stringifiedStoredIdea = JSON.stringify(storedIdea);
  localStorage.setItem(timeStamp, stringifiedStoredIdea);
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


function getIdeaFromLocalStorage(){
  for (var i=0; i<localStorage.length; i++) {
    var timeStamp = localStorage.key(i);
    var stringifiedIdea = localStorage.getItem(timeStamp)
    var parsedIdeaToDisplay= JSON.parse(stringifiedIdea);
     var cardHTML = generateHTMLCard(parsedIdeaToDisplay);
  $( ".bottom-box" ).prepend(cardHTML);   
  }
};

$('.search-input').on('keyup', searchIdeas);

function searchIdeas(){
  var searchInput = $('.search-input').val().toLowerCase();
  var allIdeas = $('.card-container');
  for (var i=0; i < allIdeas.length; i++) {
    var ideaTitle = $(allIdeas[i]).children('.title-of-card').text().toLowerCase();
    var ideaBody = $(allIdeas[i]).children('.body-of-card').text().toLowerCase();
      if (ideaTitle.includes(searchInput) || ideaBody.includes(searchInput)){
        $(allIdeas[i]).removeClass('hidden');
      }
      else {
      $(allIdeas[i]).addClass('hidden');
      }
    }
  }

      










