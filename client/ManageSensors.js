Template.ManageSensors.onCreated(function() {
  Meteor.subscribe('sensors');
  Session.setDefault('accessToken', '');
});

Template.ManageSensors.helpers({
  sensors: function() {
    return AccessTokens.find({
      userId: Meteor.userId()
    });
  },
  accessToken: function() {
    return Session.get('accessToken');
  }
});

Template.ManageSensors.events({
  'click #public-btn': function() {
    Meteor.call('changePublicityStatus', this._id, true);
  },

  'click #private-btn': function() {
    Meteor.call('changePublicityStatus', this._id, false);
  },
  "click #tokenButton": function() {
    Meteor.call('generateAccessToken', function(error, result) {
      if (error) {} else {
        Session.set('accessToken', result);
      }
    });
  }
});
