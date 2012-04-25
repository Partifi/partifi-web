if (Meteor.is_client) {

  Template.events.eventlist = function () {
    return Events.find({}, {sort: {name: 1}});
  };

  Template.user.user = function () {
    return User.find({}, {sort: {name: 1}});
  };

  // events
  Template.events.events = {
    'click .events': function (event) {
      console.log("foo");
      // update user object: facebook id and event id
      // go to user 'home' with current playing, list and form
    }
  };
  Template.hello.events = {
    'click .fblogin': function (event) {
      event.preventDefault();
      FB.login(function(response) { }, {scope:'user_events'});
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

