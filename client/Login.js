Template.LoginPage.onCreated(function() {
    Session.setDefault('newUser', false);
});

Template.LoginPage.helpers({
    newUser:function() {
        return Session.get('newUser');
    }
})

Template.LoginPage.events({
  'submit #LoginForm': function(event) {
    event.preventDefault();
    var userEmail = event.target.registerUserEmail.value
    var userPassword = event.target.registerPassword.value

    Meteor.loginWithPassword(userEmail, userPassword, function(error) {
      if (error) {
        console.log(error.reason);
      }
    });
  },

  'click #CreateUserbtn': function() {
      console.log('Clicked')
    Session.set('newUser', true);
},

    'click #Backbtn': function() {
        console.log('clicked');
        Session.set('newUser', false);
    }
});
