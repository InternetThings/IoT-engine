//Main router for handling pages etc.
//Main route. Render platform main site.
Router.route('/', function() {
    this.render('UserAccountPage', {to: 'Content'});
});

Router.configure({
    layoutTemplate: 'MainPage'
})
