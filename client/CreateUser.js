Template.CreateUserPage.events({
  "click #CreateUserbtn": function(event) {
    event.preventDefault();
    var newUsername = "";
    var newUserEmail = "";
    var passwordFirst = "";
    var passwordSecond = "";
    var valid = true;
    try {
      validate();
    } catch (error) {
      console.log(error);
    }
    
    function validate() {
      newUsername = $('#registerUsername').val();
      newUserEmail = $('#registerEmail').val();
      passwordFirst = $('#registerPasswordFirst').val();
      passwordSecond = $('#registerPasswordSecond').val();

      if (newUsername !== null && newUsername !== undefined && newUsername !== '') {} else {
        valid = false;
        throw "No username was entered.";
      }

      if (newUserEmail !== null && newUserEmail !== undefined && newUserEmail !== '') {} else {
        valid = false;
        throw "No email was entered.";
      }

      if (passwordFirst !== null && passwordFirst !== undefined && passwordFirst !== '') {} else {
        valid = false;
        throw "First password was not entered.";
      }

      if (passwordSecond !== null && passwordSecond !== undefined && passwordSecond !== '') {} else {
        valid = false;
        throw "Second password was not entered.";
      }

      if (passwordFirst === passwordSecond) {} else {
        valid = false;
        throw "Passwords don't match.";
      }

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
        console.log("Error. The user could not be created.");
      }
    }
  }
});
