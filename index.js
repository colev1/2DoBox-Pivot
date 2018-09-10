var numCards = 0;

//this function is creating a new card using the parameters 
function generateHTMLCard(card) {
  return `<div id="${card.id}" class="card-container">
            <p class = "title-of-card"> ${card.title}<button class="delete-button"></button> </p>
            <p class="body-of-card"> ${card.body} </p> 
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
  // localStoreCard();
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
}

function changeQualityUp() {
  var $currentQuality = $($(event.target).siblings('.quality').children()[0]);
  if ($currentQuality.text().trim() === 'swill'){
    $currentQuality.text('plausible');
  } else {
    $currentQuality.text('genius');
  }
}

function changeQualityDown() {
  var $currentQuality = $($(event.target).siblings('.quality').children()[0]);
  if ($currentQuality.text().trim() === 'genius') {
    $currentQuality.text('plausible');
  } else {
    $currentQuality.text('swill')
  }
}

function Card (id, title, body, quality){
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
  this.id = id;
  return this;
}


//  $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}



//rewrite upvote downvote idea functions into smaller functions

// $(".bottom-box").on('click', changeQuality);

// function changeQuality(event){
//   if (event.target.className === "upvote"){
//   upVoteIdea(event);
//   }
//   else if (event.target.className === "downvote")
//     downVoteIdea(event);
// };

// function upVoteIdea(event){
//   var currentQuality = $($(event.target).siblings('span').children()[0]).text().trim();
//   var qualityVariable = "swill";
//   // var newText = $($(event.target).siblings('p.quality').children()[0]);
//       if (currentQuality.text().trim() === "swill") {
//         console.log('hi');
//             qualityVariable = "plausible";
//         // debugger
//             currentQuality.text('plausible');
//           }
//    else if (currentQuality === "plausible"){
//       qualityVariable = "genius";
//       nextText.text(qualityVariable);
//   }
// };

// function downVoteIdea(event){
//   console.log('hey');
// }



// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable = "swill";

//     if (event.target.className === "upvote" || event.target.className === "downvote"){

//         if (event.target.className === "upvote" && currentQuality === "plausible"){
//             qualityVariable = "genius";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "upvote" && currentQuality === "swill") {
//             qualityVariable = "plausible";
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
//         } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//             qualityVariable = "swill"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "genius") {
//             qualityVariable = "plausible"
//             $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//         } else if (event.target.className === "downvote" && currentQuality === "swill") {
//             qualityVariable = "swill";
        
//         } else if (event.target.className === "upvote" && currentQuality === "genius") {
//             qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });



      










