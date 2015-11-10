Template.LoginPage.events({
  'click Loginbtn': function(event) {
    event.preventDefault();
    var userEmail = event.target.registerUserEmail.value;
    var userPassword = event.target.registerPassword.value;

    Meteor.loginWithPassword(userEmail, userPassword, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        Router.go('UserAccountPage');
      }
    });
  },

  'click CreateUserbtn': function() {
    Console.log("CreateUserbtn trykket på.")
    Router.go('CreateUserPage');
  }
});
