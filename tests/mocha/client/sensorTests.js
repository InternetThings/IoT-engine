//Tests for adding sensors to accounts client side

MochaWeb.testOnly(function() {
    describe('sensor registration', function() {
        //Test setup. Done parameter indicates that the function has asynchronous elements, and that done will be called when setup is complete.
        before(function(done) {
            //First make sure we are logged in
            if(Meteor.userId()) {
                //We are logged in, setup is done
                done();
            }
            else {
                //We are not login, attempt login with password
                Meteor.loginWithPassword('test@test.dk', "password", function(error) {
                    if(error) {
                        //User is not created, create new user.
                        Accounts.createUser({username:'test@test.dk', password:'password'}, done);
                    }
                    else {
                        //We are logged in, setup is done
                        done();
                    }
                });
            }
        });

        //First we need an access token, interface should have a button that generates it, sets a session variable with it and display it in an element with id tokenField.
        //Again, the function for generating the token lies server side, and so you need to add the done parameter that you call after everything is set up.
        describe('retrieve access token', function() {
            //First we make sure the session variable is empty.
            it('should have an empty session variable called accessToken', function() {
                chai.assert.equal($('#tokenField').val(), '');
            });

            //Then we click the button and check if it is generated properly
            it('should generate a token server side and set the session variable', function(done) {
                //Click the button
                $('#tokenButton').click();
                //Autorun loop that checks for changes to the session variable, if no changes occur on 2000 ms it is considered and error and the test will fail.
                Tracker.autorun(function(computation) {
                    //If the session variable has a value the test succeeds and we stop the autorun computation.
                    if(!Session.equals('accessToken', '') && !Session.equals('accessToken', undefined)) {
                        computation.stop();
                        //And finally we call done to indicate that all tests are completed in this category.
                        done();
                    }
                });
            });

            //Then we check the html element with id tokenField to make sure it has the correct value
            it('should show the correct value in tokenField', function() {
                chai.assert($('#tokenField').val() !== '' && $('#tokenField').val() !== undefined);
                chai.assert(Session.equals('accessToken', $('#tokenField').val()));
            });
        });

        describe('posting data to the platform', function() {
            it('should accept data sent with the access token', function(done) {
                HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'update', token:Session.get('accessToken'), id:Random.id(), data:'test', date:new Date()}}, function(error, result) {
                    if(error) {
                        done(error);
                    }
                    else {
                        console.log(result.content);
                        chai.assert.equal(result.content, 'Updated');
                        done();
                    }
                });
            });

            it('should not accept data sent without the access token', function(done) {
                HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'update', token:'', id:Random.id(), data:'test', date:new Date()}}, function(error, result) {
                    if(error) {
                        done(error);
                    }
                    else {
                        chai.assert.notEqual(result.content, 'Updated');
                        done();
                    }
                });
            });
        });

        describe('users', function() {
            it('should see all their access tokens', function(done) {
                Meteor.subscribe('tokens', {
                    onReady:function() {
                        chai.assert.equal(AccessTokens.findOne().tokens[0], Session.get('accessToken'));
                        done();
                    },
                    onStop:done
                });
            });

            it('should receive sensor data from registered sensors', function(done) {
                Meteor.subscribe('sensorData', {
                    onReady:function() {
                        var currentDataCount = SensorData.find().count();
                        HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'update', token:Session.get('accessToken'), id:Random.id(), data:'test', date:new Date()}}, function(error, result) {
                            if(error) {
                                done(error);
                            }
                            else {
                                chai.assert.equal(currentDataCount+1, SensorData.find().count());
                                done();
                            }
                        });
                    },
                    onStop:done
                });
            });
        });
    });
});
