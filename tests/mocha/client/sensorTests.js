//Tests for adding sensors to accounts client side

MochaWeb.testOnly(function() {
    describe('sensor registration', function() {
        //Test setup. Done parameter indicates that the function has asynchronous elements, and that done will be called when setup is complete.
        before(function(done) {
            //First make sure we are logged in
            if(Meteor.userId) {
                //We are logged in, setup is done
                done();
            }
            else {
                //We are not login, attempt login with password
                Meteor.loginWithPassword('Test', "password", function(error) {
                    if(error) {
                        //User is not created, create new user.
                        Accounts.createUser({username:'Test', password:'password'}, done);
                    }
                    else {
                        //We are logged in, setup is done
                        done();
                    }
                });
            }
        });

        describe('retrieve access token', function(done) {
            chai.assert(Session.equals('accessToken', ''));
            $('#tokenButton').click();
            Tracker.autorun(function(computation) {
                if(!Session.equals('accessToken', '')) {
                    computation.stop();
                    done();
                }
            });
        });

        describe('')
    });
});
