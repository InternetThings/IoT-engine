//Main router for handling pages etc.
//Main route. Render platform main site.

Router.configure({
    layoutTemplate: 'MainPage'
})

Router.route('/', function() {
    this.render('NotificationPage', {to: 'Content'});
});

Router.route('/NotificationPage', function() {
    //this.render('UserAccountPage', {to: 'Content'});
    this.render('NotificationPage', {to: 'Content'});
});

Router.route('/ManageSensorPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('ManageSensorPage', {to: 'Content'});
});

Router.route('/CreateRuleSetPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('CreateRuleSetPage', {to: 'Content'});
});
