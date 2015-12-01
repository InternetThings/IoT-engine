Template.UserAccountNavPage.events({
  "click #Logoutbtn": function(event){
    event.preventDefault();
    Meteor.logout();
  }
});
