Template.LoginPage.onCreated(function() {
  Session.setDefault('newUser', false);
});

Template.LoginPage.helpers({
  newUser: function() {
    return Session.get('newUser');
  },

  errorText: function() {
    return Session.get('error-text');
  }
});

Template.LoginPage.events({
  'submit #LoginForm': function(event) {
    event.preventDefault();
    var userEmail = event.target.registerUserEmail.value
    var userPassword = event.target.registerPassword.value

    Meteor.loginWithPassword(userEmail, userPassword, function(error) {
      if (error) {
        Session.set('error-text', error.message);
      }
    });
  },

  'click #GoToCreateUserbtn': function() {
    Session.set('error-text', '');
    Session.set('newUser', true);
  },

  'click #Backbtn': function() {
    Session.set('error-text', '');
    Session.set('newUser', false);
  }
});
