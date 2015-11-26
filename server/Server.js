Meteor.startup(function() {
    Meteor.setTimeout(ParseDataQueue, 10000);
})

Meteor.publish('sensors', function() {
    if(this.userId) {
        return AccessTokens.find({userId:this.userId, sensor:{$nin:[undefined]}});
    }
    this.ready();
});

Meteor.publish('publicSensors', function() {
    if(this.userId) {
        return AccessTokens.find({public:true});
    }
    this.ready();
});

Meteor.publish('notifications', function() {
    if(this.userId) {
        return Notifications.find({userId:this.userId});
    }
    this.ready();
});

Meteor.publish('ruleSets', function() {
    if(this.userId) {
        return RuleSets.find({userId:this.userId});
    }
    this.ready();
});

SensorDataSubscriptions = [];

Meteor.publish('sensorData', function(tokens) {
    if(this.userId && tokens instanceof Array) {
        var userId = this.userId;
        var i = 0;
        var found = false;
        while(!found && i < SensorDataSubscriptions.length) {
            if(SensorDataSubscriptions[i].userId === this.userId) {
                found = true;
            }
            else {
                i++;
            }
        }
        if(found) {
            SensorDataSubscriptions.splice(i, 1);
        }
        var regTokens = [];
        tokens.forEach(function(value) {
            if(AccessTokens.find({_id:value}).count() > 0) {
                regTokens.push(value);
            }
        });
        SensorDataSubscriptions.push({userId:this.userId, tokens:tokens, subscription:this});
    }
    this.ready();
});

Meteor.methods({
    'generateAccessToken':function() {
        if(Meteor.userId()) {
            AccessTokens.remove({sensor:undefined, userId:Meteor.userId()});
            return AccessTokens.insert({sensor:undefined, userId:Meteor.userId(), public:false});
        }
        else {
            throw new Error('You must be logged in');
        }
    },

    'changePublicityStatus':function(token, public) {
        if(Meteor.userId()) {
            check(token, String);
            check(public, Boolean);
            AccessTokens.update({_id:token, userId:Meteor.userId()}, {$set:{public:public}});
        }
        else {
            throw new Error('You must be logged in');
        }
    },

    'CreateRuleSet': function(title, message, list_of_conditions) {
        if(Meteor.userId()) {
          var newRuleSet = {
            title: title,
            message: message,
            conditions: list_of_conditions,
            timeOfEvent: undefined,
            userId: Meteor.userId()
          }
          if (ValidateRuleSet(newRuleSet)) {
            RuleSets.insert(newRuleSet);
          } else {
            throw new Error("RuleSet could not be created.");
          }
          return newRuleSet;
        }
        else {
            throw new Error('User must be logged in');
        }
    }
});

//Background task for generating notifications
DataQueue = [];

ParseDataQueue = function() {
    var Queue = DataQueue.splice(0, DataQueue.length);
    while(Queue.length > 0) {
        var data = Queue.pop();
        var updatedRuleSets = [];
        RuleSets.find({'conditions.accessToken_id':data.token}).forEach(function(ruleSet) {
            var updatedConditions = {};
            var updated = false;
            ruleSet.conditions.forEach(function(condition, index) {
                if(condition.accessToken_id === data.token && EvaluateCondition(data.data, condition)) {
                    updated = true;
                    updatedConditions['conditions.' + index + '.fulfilled'] = true;
                }
                else if(condition.fulfilled) {
                    updated = true;
                    updatedConditions['conditions.' + index + '.fulfilled'] = false;
                }
            });
            if(updated) {
                updatedConditions.push({_id:ruleSet._id, conditions:updatedConditions});
            }
        });

        updatedRuleSets.forEach(function(value) {
            RuleSets.update({_id:value._id}, {$set:value.conditions});
        });
    }
    var now = new Date();
    var tooOld = new Date();
    tooOld.setDate(tooOld.getDate()-1);
    RuleSets.find({'conditions.fulfilled':{$nin:[false]}}).forEach(function(ruleSet) {
        if(Notifications.find({date:{$gt:tooOld}, ruleSet:ruleSet._id}).count() === 0) {
            Notifications.insert({date:now, ruleSet:ruleSet._id, message:ruleSet.message, userId:ruleSet.userId});
        }
    });
    Meteor.setTimeout(ParseDataQueue, 10000);
}
