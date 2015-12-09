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
            sort: {
                date: -1
            }
        }, {
            fields: {
                date: 1,
                ruleset: 1
            }
        });
        notifications.forEach(function(notification) {
            ruleset = RuleSets.findOne({
                _id: notification.ruleset
            }, {
                fields: {
                    title: 1,
                    message: 1
                }
            });
            if (ruleset) {
                notificationInfo = {
                    date: notification.date.toLocaleString('da-DK'),
                    title: ruleset.title,
                    message: ruleset.message
                }

                results.push(notificationInfo);
            }
        });
        return results;
    }
});
