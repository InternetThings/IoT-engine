//Client side condition tests.
MochaWeb.testOnly(function() {
    var expectedCondition;
    var accessToken;

    before(function() {
        accessToken = {
            _id: 1
        }

        expectedCondition = {
            accessToken_id: undefined,
            operator: ">",
            targetValue: 15,
            fulfilled: false
        }

        expectedCondition.accessToken_id = accessToken._id;
    });

    describe('create condition', function() {
        it('creates a condition', function() {
            var actualCondition = CreateCondition(accessToken._id, ">", 15);
            chai.assert.deepEqual(actualCondition, expectedCondition);
        });
    });

    describe('evaluate conditions', function() {
        before(function() {
            sensor = 17;

            condition2 = {
                sensor_id: 1,
                operator: "",
                targetValue: 15
            }
        });

        it('is greater than', function() {
            condition2.operator = ">";
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
        });

        it('is less than', function() {
            condition2.operator = "<";
            condition2.targetValue = 20;
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
        });

        it('is greater than or equal', function() {
            condition2.operator = ">=";
            condition2.targetValue = 17;
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
            condition2.targetValue = 15;
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
        });

        it('is less than or equal', function() {
            condition2.operator = "<=";
            condition2.targetValue = 17;
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
            condition2.targetValue = 20;
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
        });

        it('is equal', function() {
            condition2.operator = "=";
            condition2.targetValue = 17;
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
        });

        it('is not equal', function() {
            condition2.operator = "!=";
            condition2.targetValue = 15;
            var result = EvaluateCondition(sensor, condition2);
            chai.assert.equal(result, true);
        });
    });

    describe('create ruleSet', function() {
        before(function(done) {
            if (Meteor.userId()) {
                //We are logged in, setup is done
                done();
            }
            else {
                //We are not login, attempt login with password
                Meteor.loginWithPassword('testuser@test.dk', "123", function(error) {
                    if (error) {
                        //User is not created, create new user.
                        Accounts.createUser({
                            username: 'testuser@test.dk',
                            password: '123'
                        }, done);
                    }
                    else {
                        //We are logged in, setup is done
                        done();
                    }
                });
            }
        });

        it('creates a ruleSet', function(done) {
            var message = "Please water my plants while im gone. Thank you.";
            var title = 'Test Ruleset';
            var conditions = [{
                accessToken: 1,
                operator: ">",
                targetValue: 15
            }];

            Meteor.call('CreateRuleSet', title, message, conditions, function(error, ruleSet) {
                if (error) {
                    done(error);
                }
                else {
                    chai.assert(ruleSet !== null && ruleSet !== undefined);
                    done();
                }
            });
        });
    });
});
