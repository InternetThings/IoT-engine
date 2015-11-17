Meteor.publish('tokens', function() {
    if(this.userId) {
        return AccessTokens.find({userId:this.userId});
    }
});

SensorDataSubscriptions = [];

Meteor.publish('sensorData', function() {
    if(this.userId) {
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
        SensorDataSubscriptions.push({userId:this.userId, subscription:this});
    }
    this.ready();
});

Meteor.methods({
    'generateAccessToken':function() {
        if(Meteor.userId()) {
            return AccessTokens.insert({sensor:undefined, userId:Meteor.userId()});
        }
        else {
            throw new Error('You must be logged in');
        }
    }
});
