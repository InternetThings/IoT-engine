Template.LoginPage.events({
  'click #Loginbtn': function(event) {
    event.preventDefault();
    var userEmail = $('registerUserEmail').val();
    var userPassword = $('registerPassword').val();

    Meteor.loginWithPassword(userEmail, userPassword, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        Router.go('/useraccountpage');
      }
    });
  },

  'click #CreateUserbtn': function() {
    Router.go('/createuserpage');
  }
});
