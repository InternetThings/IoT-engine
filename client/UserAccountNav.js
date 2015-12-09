Template.UserAccountNavPage.events({
    "click #Logoutbtn": function(event) {
        event.preventDefault();
        var canvas = document.getElementById('dataCanvas');
        if(canvas) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        }
        Meteor.logout();
    }
});
