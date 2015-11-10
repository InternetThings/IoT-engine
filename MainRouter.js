//Main router for handling pages etc.
//Main route. Render platform main site.
Router.route('/', function() {
    this.render('MainPage');
});

Router.route('/loginpage', function() {
  this.render('LoginPage');
});

Router.route('/createuserpage', function() {
  this.render('CreateUserPage');
});

Router.route('/useraccountpage', function() {
  this.render('UserAccountPage');
});
