//Tests for adding sensors to accounts client side

MochaWeb.testOnly(function() {
    var sensorId = Random.id();

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
            it('should not accept data from an unregistered sensor', function(done) {
                HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'update', token:Session.get('accessToken'), id:sensorId, data:25, date:new Date()}}, function(error, result) {
                    if(error) {
                        done(error);
                    }
                    else {
                        chai.assert.equal(result.content, 'Error thrown with message: Invalid access token.');
                        done();
                    }
                });
            });

            it('should be able to register a sensor with an unconsumed token', function(done) {
                HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'register', token:Session.get('accessToken'), id:sensorId, type:'Temperature', location:'Home Address', tags:['Garden', 'Cucumber']}}, function(error, result) {
                    if(error) {
                        done(error);
                    }
                    else {
                        chai.assert.equal(result.content, 'Registered');
                        done();
                    }
                });
            });

            it('should not be able to register a sensor with a consumed token', function(done) {
                HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'register', token:Session.get('accessToken'), id:sensorId, type:'Temperature', location:'Home Address', tags:['Garden', 'Cucumber']}}, function(error, result) {
                    if(error) {
                        done(error);
                    }
                    else {
                        chai.assert.equal(result.content, 'Error thrown with message: Registration failed.');
                        done();
                    }
                });
            });

            it('should accept data sent with the access token', function(done) {
                HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'update', token:Session.get('accessToken'), id:sensorId, data:25, date:new Date()}}, function(error, result) {
                    if(error) {
                        done(error);
                    }
                    else {
                        chai.assert.equal(result.content, 'Updated');
                        done();
                    }
                });
            });

            it('should not accept data sent without the access token', function(done) {
                HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'update', token:'', id:sensorId, data:25, date:new Date()}}, function(error, result) {
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
            before(function(done) {
                Meteor.subscribe('sensorData', [sensorId], {
                    onReady:function() {
                        HTTP.post('/sensors', {headers:{sdtpversion:SDTPVersion}, data:{method:'update', token:Session.get('accessToken'), id:sensorId, data:'test', date:new Date()}}, function(error, result) {
                            if(error) {
                                done(error);
                            }
                            else {
                                done();
                            }
                        });
                        done();
                    },
                    onStop:done
                });
            });

            it('should receive sensor data from registered sensors', function(done) {
                Tracker.autorun(function(computation) {
                    if(SensorData.find().count() > 0) {
                        computation.stop();
                        var data = SensorData.findOne();
                        chai.assert.equal(data.data, 'test');
                        done();
                    }
                });
            });
        });

        describe('sensors', function() {
            var subHandle;

            before(function(done) {
                subHandle = Meteor.subscribe('sensors', {
                    onReady:done,
                    onStop:done
                });
            });

            it('should have access to your consumed tokens', function() {
                chai.assert(AccessTokens.find({sensor:sensorId}).count() > 0);
            });

            it('should have the correct metadata', function() {
                var token = AccessTokens.findOne({sensor:sensorId});
                chai.assert.equal(token.type, 'Temperature');
                chai.assert.equal(token.location, 'Home Address');
                chai.assert.equal(token.tags[0], 'Garden');
                chai.assert.equal(token.tags[1], 'Cucumber');
            });

            after(function() {
                subHandle.stop();
            });
        });

        describe('sharing', function() {
            before(function(done) {
                Meteor.subscribe('publicSensors', {
                    onReady:done,
                    onStop:done
                });
            });

            it('should not show on the public sensors collection', function() {
                chai.assert(AccessTokens.find({sensor:sensorId}).count() === 0);
            });

            it('should be able to make a sensor public', function(done) {
                Meteor.call('changePublicityStatus', sensorId, true, function(error) {
                    if(error) {
                        done(error);
                    }
                    else {
                        var token = AccessTokens.findOne({sensor:sensorId});
                        chai.assert(token !== undefined);
                        chai.assert(token.public);
                        done();
                    }
                });
            });

            it('should be able to make a sensor private', function(done) {
                Meteor.call('changePublicityStatus', sensorId, false, function(error) {
                    if(error) {
                        done(error);
                    }
                    else {
                        chai.assert(AccessTokens.findOne({sensor:sensorId}) === undefined);
                        done();
                    }
                });
            });
        });
    });
});
