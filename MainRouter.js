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

Router.route('/NotificationPage', function() {
    //this.render('UserAccountPage', {to: 'Content'});
    this.render('NotificationPage');
    this.layout('UserAccountNavPage');
});

Router.route('/ManageSensorsPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('ManageSensorsPage');
    this.layout('UserAccountNavPage');
});

Router.route('/CreateRuleSetPage', function() {
    //this.render('ManageSensors', {to: 'Content'});
    this.render('CreateRuleSetPage');
    this.layout('UserAccountNavPage');
});
