Template.CreateUserPage.events({
  "click CreateUserbtn": function(event){
    event.preventDefault();
    var newUserEmail = event.target.registerEmail.value;
    var passwordFirst = event.target.registerPasswordFirst.value;
    var passwordSecond = event.target.registerPasswordSecond.value;

    Accounts.createUser({
      email: newUserEmail,
      password: passwordFirst
    },
    function(error) {
      if(error) {
        Console.log(error.reason);
      } else {
        Router.go('LoginPage');
    }});
    }
  });
