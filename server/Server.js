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

Meteor.publish('sensorData', function(sensors) {
    if(this.userId && sensors instanceof Array) {
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
        var regSensors = {}
        sensors.forEach(function(value) {
            var token = AccessTokens.findOne({sensor:value, $or:[{userId:userId}, {public:true}]});
            if(token !== undefined) {
                regSensors[token._id] = value;
            }
        });
        SensorDataSubscriptions.push({userId:this.userId, sensors:regSensors, subscription:this});
    }
    this.ready();
});

Meteor.methods({
    'generateAccessToken':function() {
        if(Meteor.userId()) {
            return AccessTokens.insert({sensor:undefined, userId:Meteor.userId(), public:false});
        }
        else {
            throw new Error('You must be logged in');
        }
    },

    'changePublicityStatus':function(sensor, public) {
        if(Meteor.userId()) {
            check(sensor, String);
            check(public, Boolean);
            AccessTokens.update({sensor:sensor, userId:Meteor.userId()}, {$set:{public:public}});
        }
        else {
            throw new Error('You must be logged in');
        }
    }
});
