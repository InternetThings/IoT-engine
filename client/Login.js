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
      } else {
        Router.go('/useraccountpage');
      }
    });
  },

  'click #CreateUserbtn': function() {
    Router.go('/createuserpage');
  }
});
