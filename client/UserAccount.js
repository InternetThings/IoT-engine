Template.UserAccountPage.onCreated(function() {
    console.log('Created');
});

Template.UserAccountPage.events({
  "click #Logoutbtn": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('/loginpage');
  }
});
