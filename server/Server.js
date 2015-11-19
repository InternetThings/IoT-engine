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

    'CreateRuleSet': function(message, list_of_conditions) {
      var newRuleSet = {
        message: message,
        conditions: list_of_conditions,
        timeOfEvent: undefined
      }
      if (ValidateRuleSet(newRuleSet)) {
        RuleSets.insert(newRuleSet);
      } else {
        throw new Error("RuleSet could not be created.");
      }
      return newRuleSet;
    }
});
