Meteor.startup(function() {
    //Start data parsing.
    Meteor.setTimeout(ParseDataQueue, 10000);
})

//Publish all sensors owned by the user.
Meteor.publish('sensors', function() {
    if (this.userId) {
        return AccessTokens.find({
            userId: this.userId,
            sensor: {
                $nin: [undefined]
            }
        });
    }
    this.ready();
});

//Publish all public sensors.
Meteor.publish('publicSensors', function() {
    if (this.userId) {
        return AccessTokens.find({
            public: true
        });
    }
    this.ready();
});

//Publish all notifications relevant to the user.
Meteor.publish('notifications', function() {
    if (this.userId) {
        return Notifications.find({
            userId: this.userId
        });
    }
    this.ready();
});

//Publush all rulesets owned by the user.
Meteor.publish('ruleSets', function() {
    if (this.userId) {
        return RuleSets.find({
            userId: this.userId
        });
    }
    this.ready();
});

//List of all sensordata subscriptions.
SensorDataSubscriptions = [];

//Publish sensordata, this data is not saved on the server, but is instead pushed directly to subscribed clients.
Meteor.publish('sensorData', function(tokens) {
    //Make sure the user is logged in and has provided an array of access tokens.
    if (this.userId && tokens instanceof Array) {
        var userId = this.userId;
        var i = 0;
        var found = false;
        //If the user already has a subscription, overwrite that subscription.
        while (!found && i < SensorDataSubscriptions.length) {
            if (SensorDataSubscriptions[i].userId === this.userId) {
                found = true;
            }
            else {
                i++;
            }
        }
        if (found) {
            SensorDataSubscriptions.splice(i, 1);
        }
        //Find all valid tokens.
        var regTokens = [];
        tokens.forEach(function(value) {
            if (AccessTokens.find({
                    _id: value
                }).count() > 0) {
                regTokens.push(value);
            }
        });
        //Push subscription to array.
        SensorDataSubscriptions.push({
            userId: this.userId,
            tokens: tokens,
            subscription: this
        });
    }
    this.ready();
});

//Meteor methods. Server methods that are open to the client.
Meteor.methods({
    //Generates a new access token for the user. If the user already has a non-consumed access token the old on is overwritten.
    'generateAccessToken': function() {
        if (Meteor.userId()) {
            AccessTokens.remove({
                sensor: undefined,
                userId: Meteor.userId()
            });
            return AccessTokens.insert({
                sensor: undefined,
                userId: Meteor.userId(),
                public: false
            });
        }
        else {
            throw new Error('You must be logged in');
        }
    },

    //Change the publicity status of an access token.
    'changePublicityStatus': function(token, public) {
        if (Meteor.userId()) {
            check(token, String);
            check(public, Boolean);
            AccessTokens.update({
                _id: token,
                userId: Meteor.userId()
            }, {
                $set: {
                    public: public
                }
            });
        }
        else {
            throw new Error('You must be logged in');
        }
    },

    //Create a new ruleset from a title, message and list of conditions.
    'CreateRuleSet': function(title, message, list_of_conditions) {
        if (Meteor.userId()) {
            var newRuleSet = {
                title: title,
                message: message,
                conditions: list_of_conditions,
                userId: Meteor.userId()
            }
            try {
                ValidateRuleSet(newRuleSet);
                var rulesetId = RuleSets.insert(newRuleSet);
                return rulesetId;
            }
            catch (error) {
                throw new Meteor.Error('Error', error.message);
            }
        }
        else {
            throw new Error('User must be logged in');
        }
    }
});

//Background task for generating notifications
//DataQueue stores all received data in a queue that is parsed every 10 seconds. Notifications are then genereated from the result.
DataQueue = [];

//Parsing function for the data queue.
ParseDataQueue = function() {
    //First we empty the queue and save it to a local variable. This is done to avoid concurrent modification problems.
    var Queue = DataQueue.splice(0, DataQueue.length);
    while (Queue.length > 0) {
        var data = Queue.pop();
        var updatedRuleSets = [];
        //Look through each ruleset relevant to the data and update conditions that are relevant.
        RuleSets.find({
            'conditions.accessToken_id': data.token
        }).forEach(function(ruleSet) {
            var updatedConditions = {};
            var updated = false;
            ruleSet.conditions.forEach(function(condition, index) {
                if (condition.accessToken_id === data.token && EvaluateCondition(data.data, condition)) {
                    updated = true;
                    updatedConditions['conditions.' + index + '.fulfilled'] = true;
                }
                else if (condition.fulfilled) {
                    updated = true;
                    updatedConditions['conditions.' + index + '.fulfilled'] = false;
                }
            });
            if (updated) {
                updatedRuleSets.push({
                    _id: ruleSet._id,
                    conditions: updatedConditions
                });
            }
        });

        updatedRuleSets.forEach(function(value) {
            RuleSets.update({
                _id: value._id
            }, {
                $set: value.conditions
            });
        });
    }

    //Look at the updated rulesets and generate notifications for rulesets that has not genereated one today and have no unfulfilled conditions.
    var now = new Date();
    var tooOld = new Date();
    tooOld.setDate(tooOld.getDate() - 1);
    RuleSets.find({
        'conditions.fulfilled': {
            $nin: [false]
        }
    }).forEach(function(ruleSet) {
        if (Notifications.find({
                date: {
                    $gt: tooOld
                },
                ruleset: ruleSet._id
            }).count() === 0) {
            Notifications.insert({
                date: now,
                ruleset: ruleSet._id,
                userId: ruleSet.userId
            });
        }
    });
    //Finally set up the next parsing of the queue.
    Meteor.setTimeout(ParseDataQueue, 10000);
}
