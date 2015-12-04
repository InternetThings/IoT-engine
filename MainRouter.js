//Main router for handling pages etc.
//Main route. Render platform main site.

Router.configure({
    layoutTemplate: 'MainPage'
})

Router.route('/', function() {
    document.title = 'IoT Platform';
    this.render('NotificationPage', {to: 'Content'});
});

Router.route('/NotificationPage', function() {
    document.title = 'Notifications';
    this.render('NotificationPage', {to: 'Content'});
});

Router.route('/ManageSensorPage', function() {
    document.title = 'Sensors';
    this.render('ManageSensorPage', {to: 'Content'});
});

Router.route('/CreateRuleSetPage', function() {
    document.title = 'Rulesets';
    this.render('CreateRuleSetPage', {to: 'Content'});
});
