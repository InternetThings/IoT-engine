Template.SensorRegistration.onCreated(function() {
    Session.setDefault('accessToken', '');
});

Template.SensorRegistration.helpers({
    accessToken:function() {
        return Session.get('accessToken');
    }
});

Template.SensorRegistration.events({
    "click #tokenButton": function() {
        console.log('Clicked');
        Meteor.call('generateAccessToken', function(error, result) {
            if(error) {}
            else {
                Session.set('accessToken', result);
            }
        });
    }
});
