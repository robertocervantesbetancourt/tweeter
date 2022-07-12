/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const card = document.querySelector('.tweets-timeline');
console.log(card)

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
      <span id="days-since-tweet">${tweet['created_at']}</span>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer>
  </article>`
  );
  return $tweet;
};

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(card).append(createTweetElement(tweetData));
