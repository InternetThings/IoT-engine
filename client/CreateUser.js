Template.CreateUserPage.events({
  'click #CreateUserbtn': function(event) {
    event.preventDefault();
    var newUsername = $('#registerUsername').val();
    var newUserEmail = $('#registerEmail').val();
    var passwordFirst = $('#registerPasswordFirst').val();
    var passwordSecond = $('#registerPasswordSecond').val();

    try {
      var valid = ValidateUserInformation(newUsername, newUserEmail, passwordFirst, passwordSecond);
      if (valid) {
        Accounts.createUser({
          username: newUsername,
          email: newUserEmail,
          password: passwordFirst
        }, function(error) {
          if (error) {
            Session.set('error-text', error.reason);
          }
        });
      }
    } catch (error) {
      Session.set('error-text', error.message);
    }
  }
});
