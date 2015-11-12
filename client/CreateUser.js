Template.CreateUserPage.events({
  "click #CreateUserbtn": function(event) {
    event.preventDefault();
    var newUsername = $('#registerUsername').val();
    var newUserEmail = $('#registerEmail').val();
    var passwordFirst = $('#registerPasswordFirst').val();
    var passwordSecond = $('#registerPasswordSecond').val();

    try {
      var valid = Validate(newUsername, newUserEmail, passwordFirst, passwordSecond);
      if (valid) {
        try {
          Accounts.createUser({
            username: newUsername,
            email: newUserEmail,
            password: passwordFirst
          });
        } catch (error) {
          console.log(error.reason);
        }
      } else {
        throw "Error. The user could not be created.";
      }
    } catch (error) {
      console.log(error);
    }
  }
});

Validate = function(newUsername, newUserEmail, passwordFirst, passwordSecond) {

  var valid = true;
  if (newUsername !== null && newUsername !== undefined && newUsername !== '') {} else {
    valid = false;
    throw new Error("No username was entered.");
  }

  if (newUserEmail !== null && newUserEmail !== undefined && newUserEmail !== '') {} else {
    valid = false;
    throw new Error("No email was entered.");
  }

  if (passwordFirst !== null && passwordFirst !== undefined && passwordFirst !== '') {} else {
    valid = false;
    throw new Error("First password was not entered.");
  }

  if (passwordSecond !== null && passwordSecond !== undefined && passwordSecond !== '') {} else {
    valid = false;
    throw new Error("Second password was not entered.");
  }

  if (passwordFirst === passwordSecond) {} else {
    valid = false;
    throw new Error("Passwords do not match.");
  }
  return valid;
}
