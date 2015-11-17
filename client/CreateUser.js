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
        try {
          Accounts.createUser({
            username: newUsername,
            email: newUserEmail,
            password: passwordFirst
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});
