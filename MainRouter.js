//Main router for handling pages etc.
//Main route. Render platform main site.

Router.configure({
    layoutTemplate: 'MainPage'
})

Router.route('/', function() {
    document.title = 'IoT';
    this.render('NotificationPage', {to: 'Content'});
});

Router.route('/NotificationPage', function() {
    document.title = 'IoT';
    //this.render('UserAccountPage', {to: 'Content'});
    this.render('NotificationPage', {to: 'Content'});
});

Router.route('/ManageSensorPage', function() {
    document.title = 'IoT';
    //this.render('ManageSensors', {to: 'Content'});
    this.render('ManageSensorPage', {to: 'Content'});
});

Router.route('/CreateRuleSetPage', function() {
    document.title = 'IoT';
    //this.render('ManageSensors', {to: 'Content'});
    this.render('CreateRuleSetPage', {to: 'Content'});
});
