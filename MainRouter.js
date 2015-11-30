//Main router for handling pages etc.
//Main route. Render platform main site.

Router.configure({
    layoutTemplate: 'UserAccountNavPage'
})

Router.route('/', function() {
    //this.render('UserAccountPage', {to: 'Content'});
    this.render('NotificationPage');
    this.layout('UserAccountNavPage');
});

Router.route('/LoginPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('LoginPage');
    this.layout('UserAccountNavPage');
});

Router.route('/NotificationPage', function() {
    //this.render('UserAccountPage', {to: 'Content'});
    this.render('NotificationPage');
    this.layout('UserAccountNavPage');
});

Router.route('/ManageSensorPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('ManageSensorPage');
    this.layout('UserAccountNavPage');
});

Router.route('/CreateRuleSetPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('CreateRuleSetPage');
    this.layout('UserAccountNavPage');
});
