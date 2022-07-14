/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Assign tweet timeline container to variable
const card = document.querySelector('.tweets-timeline');
//Assign error message to a variable
const errorMessage = document.querySelector('#alert');

//Hide error message
$(errorMessage).hide();


//safe HTML
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Function that creates a new tweet card
const createTweetElement = function(tweet) {
  const $tweet = $(
  `<article>
    <header class="tweet-header">
        <img class="user-avatar" src="${tweet['user']['avatars']}">
        <span>${tweet['user']['name']}</span>            
        <span class="user-handle bold">${tweet['user']['handle']}</span>            
    </header>
    <p>${escape(tweet['content']['text'])}</p>
    <footer class="tweet-footer">
      <span id="days-since-tweet">${timeago.format(tweet['created_at'])}</span>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer>
  </article>`
  );
  return $tweet;
};


//Function that displays all the tweets
const renderTweet = function(tweets) {
  for(const tweet of tweets.reverse()) {
    $(card).append(createTweetElement(tweet));
  }
}

//This function loads all the tweets from /tweets db
const loadTweets = function() {
  $.get("/tweets", function(data){
    renderTweet(data);
  })
}

loadTweets();

//Push new tweet from form submit
const newTweet = document.querySelector('form')

$(newTweet).submit(function(event){
  event.preventDefault();
  if($(this).serialize() === 'text=') {
    $(errorMessage).append("<span>&nbspMessage can't be empty</span>").slideDown(200);
  } else if (document.querySelector('.counter').value < 0){
    //alert ("Your message is too long, it should be 120 characters")
    $(errorMessage).append("<span>&nbspYour message is too long, it should be 140 characters</span>").slideDown(200);
  } else {
    const $message = $(this).serialize();
    $.ajax('/tweets', 
    {
      method: 'POST',
      data: $(this).serialize()
    })
    .then(function(){
      document.querySelector('form').reset();
      $(document.querySelector('output')).text('140');
      $(loadTweets()).replaceAll('article');
      $(errorMessage).hide();
    })
  } 
})


//Animate arrow
const loopAnimation = () => {
$('#two-arrows-down').animate({
    opacity: 0.25,

  }, 700,  function() {

    $('#two-arrows-down').animate({
      opacity: 1,

      }, 700,  function() {
        loopAnimation();
    })
  });
}

loopAnimation()

//Hide and show new tweet section when clicking on write new tweet
const newTweetContainer = document.querySelector('.new-tweet');
const displayNewTweetContainer = document.querySelector('#nav-right');

//hide
$(newTweetContainer).hide();

//display and hide on click function
  $(displayNewTweetContainer).on('click', function () {
    $(newTweetContainer).toggle("slow", 'swing');
  })


//change nav bar color on scroll, display new tweet button on scroll
const navbar = document.querySelector('nav');
$(document.querySelector('#write-new-tweet')).hide();

$(document).scroll(function(){
  if($(this).scrollTop() > 139){
    $(document.querySelector('nav')).css("background","rgba(29, 54, 87, 1)")
    $(document.querySelector('#write-new-tweet')).show()
    $(document.querySelector('#nav-right')).hide()
  } else {
    $(document.querySelector('nav')).css("background","rgba(29, 54, 87, 0)")
    $(document.querySelector('#two-arrows-down')).css("color","rgba(230, 57, 70, 1)")
    $(document.querySelector('#write-new-tweet')).hide()
    $(document.querySelector('#nav-right')).show()
  }
})


$(document.querySelector('#write-new-tweet span')).on('click', function() {
  $(window).scrollTop(0);
  if($(newTweetContainer).is(':visible')){
  } else {
    $(newTweetContainer).toggle("slow", 'swing');
  }

})