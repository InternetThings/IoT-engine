//Main router for handling pages etc.
//Main route. Render platform main site.
Router.route('/', function() {
    this.render('UserAccountPage', {to: 'Content'});
});

Router.route('/ManageSensors', function() {
    this.render('ManageSensors', {to: 'Content'});
});

Router.configure({
    layoutTemplate: 'MainPage'
})
