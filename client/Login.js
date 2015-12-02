Template.LoginPage.onCreated(function() {
  Session.setDefault('newUser', false);
});

Template.LoginPage.helpers({
  newUser: function() {
    return Session.get('newUser');
<<<<<<< HEAD
  },

  errorText: function() {
    return Session.get('error-text');
=======
>>>>>>> 5ac8746a0f9bb1293abd0f112946be5991f6d3ec
  }
});

Template.LoginPage.events({
  'submit #LoginForm': function(event) {
    event.preventDefault();
    var userEmail = event.target.registerUserEmail.value
    var userPassword = event.target.registerPassword.value

<<<<<<< HEAD
    if(userEmail === '') {
        Session.set('error-text', 'No email entered');
    }
    else if(userPassword === '') {
        Session.set('error-text', 'No password entered');
    }
    else {
        Meteor.loginWithPassword(userEmail, userPassword, function(error) {
          if (error) {
            Session.set('error-text', error.reason);
          }
        });
    }
  },

  'click #GoToCreateUserbtn': function() {
    Session.set('error-text', undefined);
=======
    Meteor.loginWithPassword(userEmail, userPassword, function(error) {
      if (error) {
        Session.set('error-text', error.message);
      }
    });
  },

  'click #GoToCreateUserbtn': function() {
>>>>>>> 5ac8746a0f9bb1293abd0f112946be5991f6d3ec
    Session.set('newUser', true);
  },

  'click #Backbtn': function() {
<<<<<<< HEAD
    Session.set('error-text', undefined);
=======
>>>>>>> 5ac8746a0f9bb1293abd0f112946be5991f6d3ec
    Session.set('newUser', false);
  }
});
