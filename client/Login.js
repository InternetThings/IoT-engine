Template.LoginPage.onCreated(function() {
    Session.setDefault('newUser', false);
});

Template.LoginPage.helpers({
    newUser: function() {
        return Session.get('newUser');
    }
});

Template.LoginPage.events({
    'submit #LoginForm': function(event) {
        event.preventDefault();
        var userEmail = event.target.registerUserEmail.value
        var userPassword = event.target.registerPassword.value

        if (userEmail === '') {
            Session.set('error-text', 'No email entered');
        }
        else if (userPassword === '') {
            Session.set('error-text', 'No password entered');
        }
        else {
            Meteor.loginWithPassword(userEmail, userPassword, function(error) {
                if (error) {
                    Session.set('error-text', error.reason);
                }
            });
        }
    },

    'click #GoToCreateUserbtn': function() {
        Meteor.loginWithPassword(userEmail, userPassword, function(error) {
            if (error) {
                Session.set('error-text', error.message);
            }
        });
    },

    'click #GoToCreateUserbtn': function() {
        Session.set('newUser', true);
    },

    'click #Backbtn': function() {
        Session.set('newUser', false);
    }
});
