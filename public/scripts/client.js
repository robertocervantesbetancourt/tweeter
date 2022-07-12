/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Assign tweet timeline container to variable
const card = document.querySelector('.tweets-timeline');

//Function that creates a new tweet card
const createTweetElement = function(tweet) {
  const $tweet = $(
  `<article>
    <header class="tweet-header">
        <img class="user-avatar" src="${tweet['user']['avatars']}">
        <span>${tweet['user']['name']}</span>            
        <span class="user-handle bold">${tweet['user']['handle']}</span>            
    </header>
    <p>${tweet['content']['text']}</p>
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
  for(const tweet of tweets) {
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
  console.log($(this).serialize())
  if($(this).serialize() === 'text=') {
    alert("Message can't be empty");
  } else {
    $.ajax('/tweets', 
    {
      method: 'POST',
      data: $(this).serialize()
    })
  }
  
  event.preventDefault();
})

