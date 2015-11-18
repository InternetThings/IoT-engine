Template.SensorManagement.onCreated(function() {
    Meteor.subscribe('sensors');
});

Template.SensorManagement.helpers({
    sensors:function() {
        return AccessTokens.find({userId:Meteor.userId()});
    }
});

Template.SensorManagement.events({
    'click #public-btn':function() {
        Meteor.call('changePublicityStatus', this._id, true);
    },

    'click #private-btn':function() {
        Meteor.call('changePublicityStatus', this._id, false);
    }
});
