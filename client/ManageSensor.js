Template.ManageSensorPage.onCreated(function() {
  Meteor.subscribe('sensors');
  Session.setDefault('accessToken', '');
});

Template.ManageSensorPage.helpers({
  sensors: function() {
    return AccessTokens.find({
      userId: Meteor.userId()
    }, {
      sort: {
        sensor: 1
      }
    });
  },
  accessToken: function() {
    return Session.get('accessToken');
  }
});

Template.ManageSensorPage.events({
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
