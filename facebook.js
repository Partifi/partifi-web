Events = new Meteor.Collection("events");

if (Meteor.is_client) {
  //set up FB
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '342859172429389', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    console.log("wut");
    FB.Event.subscribe('auth.statusChange', handleStatusChange);
  };

  function handleStatusChange(response) {
    console.log("wut");
    if (response.authResponse) {
      updateUserInfo(response);
    }
  }

  function updateUserInfo(response) {
    console.log("wut");
    FB.api('/me', function(response) {
      Session.set('user', {name: response.name, id: response.id});
    });

    FB.api('/me/events', function(response) {
      Events.remove({});
      for (i in response.data) {
        Events.insert({name: response.data[i].name, id: response.data[i].id});
      }
    });
  }

  // Load the SDK Asynchronously
  (function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));
}

