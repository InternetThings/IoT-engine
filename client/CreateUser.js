Template.CreateUserPage.events({
  "click #CreateUserbtn": function(event) {
    event.preventDefault();
    var newUserEmail = $('#registerEmail').val();
    var passwordFirst = $('#registerPasswordFirst').val();
    var passwordSecond = $('#registerPasswordSecond').val();

    if(passwordFirst === passwordSecond) {
      console.log("Passwords matcher.");
      Accounts.createUser({
        email: newUserEmail,
        password: passwordFirst
      },
      function(error) {
        if(error) {
          console.log(error.reason);
          Router.go("/createuserpage");
        } else {
          Router.go('/loginpage');
        }
      });
    }
    else {
      console.log("Passwords matcher ikke.");
    }},

    'click #Backbtn': function(event) {
      event.preventDefault();
      Router.go('/loginpage');
    }
  });
