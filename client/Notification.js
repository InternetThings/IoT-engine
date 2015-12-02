Template.NotificationPage.onCreated(function() {
  Meteor.subscribe('notifications');
  Meteor.subscribe('ruleSets');
});

Template.NotificationPage.helpers({
  'get_notifications': function() {
    var results = [];
    var notifications;
    var notificationInfo;
    var ruleset;

    notifications = Notifications.find({
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
      }, {
        fields: {
          title: 1
        }
      });
      notificationInfo = {
        date: notification.date.toLocaleString('da-DK'),
        title: ruleset.title,
        message: notification.message
      }

      results.push(notificationInfo);
    });

    return results;
  }
});
