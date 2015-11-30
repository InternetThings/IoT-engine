//Main router for handling pages etc.
//Main route. Render platform main site.

Router.configure({
    layoutTemplate: 'UserAccountNavLayout'
})

Router.route('/', function() {
    this.render('MainPage', {to: 'Main'});
});

Router.route('/LoginPage', function() {
    this.render('LoginPage');
});

Router.route('/NotificationPage', function() {
    //this.render('UserAccountPage', {to: 'Content'});
    this.render('NotificationPage', {to: 'Content'});
    this.layout('UserAccountNavLayout');
});

Router.route('/ManageSensorPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('ManageSensorPage', {to: 'Content'});
    this.layout('UserAccountNavLayout');
});

Router.route('/CreateRuleSetPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('CreateRuleSetPage', {to: 'Content'});
    this.layout('UserAccountNavLayout');
});
