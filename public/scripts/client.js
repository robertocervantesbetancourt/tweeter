/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Assign tweet timeline container to variable
const card = document.querySelector('.tweets-timeline');

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
    alert("Message can't be empty");
  } else if (document.querySelector('.counter').value < 0){
    alert ("Your message is too long, it should be 120 characters")
  } else {
    const $message = $(this).serialize();
    $.ajax('/tweets', 
    {
      method: 'POST',
      data: $(this).serialize()
    })
    .then(function(){
      document.querySelector('form').reset();
      $(document.querySelector('output')).html('140');
      $(loadTweets()).replaceAll('article');
    })
  } 
})

