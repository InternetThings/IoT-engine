Template.NotificationPage.onCreated(function() {
  Meteor.subscribe('notifications');
});

Template.NotificationPage.helpers({
  'get_notifications': function() {
    var results = [];
    var notificationInfo;
    var ruleset;
    var notifications = Notifications.find({
      userId: Meteor.userId()
    }, {
      fields: {
        date: 1,
        ruleset: 1,
        message: 1
      }
    });

    notifications.forEach(function(notification) {
      ruleset = RuleSets.findOne({
        _id: notification.ruleset
      });
      notificationInfo = {
        date: notification.date,
        title: ruleset.title,
        message: ruleset.message
      }
      results.push(notificationInfo);
    });

    return results;
  }
});
