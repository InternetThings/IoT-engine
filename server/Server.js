Meteor.publish('tokens', function() {
    if(this.userId) {
        return AccessTokens.find({userId:this.userId});
    }
});

SensorDataSubscriptions = [];

Meteor.publish('sensorData', function() {
    if(this.userId) {
        SensorDataSubscriptions.push({userId:this.userId, subscription:this});
    }
    this.ready();
});

Meteor.methods({
    'generateAccessToken':function() {
        if(Meteor.userId()) {
            var token = Random.id();
            AccessTokens.upsert({userId:Meteor.userId()}, {$push:{tokens:token}});
            return token;
        }
        else {
            throw new Error('You must be logged in');
        }
    }
});
