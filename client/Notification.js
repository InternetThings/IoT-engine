Template.NotificationPage.onCreated(function() {
  Meteor.subscribe('notifications');
});

Template.NotificationPage.helpers({
  'get_notifications': function() {
    return Notifications.find({}, {
      fields: {
        //date: 1,
        ruleset: 1,
        message: 1,
        userId: 1
      }
    });
  }
});
