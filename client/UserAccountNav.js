Template.UserAccountNavLayout.events({
  "click #Logoutbtn": function(event){
    //event.preventDefault();
    Meteor.logout();
  }
});
