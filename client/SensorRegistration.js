Template.SensorRegistration.onCreated(function() {
    Session.setDefault('accessToken', '');
})

Template.SensorRegistration.events({
    "click #tokenButton": function() {
        Meteor.call('generateAccessToken', function(error, result) {
            if(error) {}
            else {
                Session.set('accessToken', result);
            }
        });
    }
});
