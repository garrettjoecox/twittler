$(document).ready(function(){
  var server = streams.home;
  var users = streams.users;
  var displayedTweets = 0;
  var shouldTweets = server.length;
  var filter = "All Tweets";

/*---------------------------------------------------*/

  setInterval(clock, 1000);
  $(".filter").on("click", function(){
    changeFilter($(this).text());
    $(".filter").removeClass("blue-grey").removeClass("white-text").addClass("black-text").addClass("white")
    $(this).removeClass("white").addClass("blue-grey").addClass("white-text");
  })

/*---------------------------------------------------*/

  //Runs once a second
  function clock(){
    pullTweets();
  }

//Applies a filter
  function changeFilter(newfilter){
    filter = newfilter;
    removeTweets();
    displayedTweets = 0;
  }

//Pulls tweets from server
  function pullTweets(){
    if (filter === "All Tweets"){
      while(server.length > displayedTweets){
        var tweet = server[displayedTweets]
        var user = tweet.user;
        var message = tweet.message;
        var timestamp = moment().format("h:mm a")
        displayTweet(user,message, timestamp)
        displayedTweets++
      }
    }else{
      while(users[filter].length > displayedTweets){
        var tweet = users[filter][displayedTweets];
        var user = tweet.user;
        var message = tweet.message;
        var timestamp = moment().format("h:mm a")
        displayTweet(user,message, timestamp)
        displayedTweets++
      }
    }
  }

  //Display tweets from database
  function displayTweet(user, message, timestamp){
    $('<div class="tweet card white">\
         <div class="card-image">\
           <img src="avi.png">\
         </div>\
         <div class="card-content" style="padding-left: 120px;">\
           <span class="card-title grey-text text-darken-4">@' + user + '</span>\
           <span class="right grey-text text-darken-1">' + timestamp + '</span>\
           <p class="grey-text text-darken-1">' + message + '</p>\
         </div>\
    </div>')
       .hide().prependTo('#tweets').slideDown("slow")
  }

//Remove all tweets to apply filter
  function removeTweets(){
    $(".tweet").remove();
  }
});