Template.LoginPage.onCreated(function() {
    Session.setDefault('newUser', false);
});

Template.LoginPage.helpers({
    newUser:function() {
        return Session.get('newUser');
    }
})

Template.LoginPage.events({
  'click #Loginbtn': function(event) {
    event.preventDefault();
    var userEmail = $('#registerUserEmail').val();
    var userPassword = $('#registerPassword').val();

    console.log("Loginbtn trykket på.");
    console.log("userEmail: " + userEmail + " userPassword: " + userPassword);

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
