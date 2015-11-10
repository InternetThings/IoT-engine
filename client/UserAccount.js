Template.UserAccountPage.events({
  "click Logoutbtn": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('LoginPage');
  }
});
