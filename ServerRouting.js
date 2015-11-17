//SDTP Protcol version
SDTPVersion = '1.0'

Router.route('/sensors', {where:'server'})
    .post(function() {
        if(this.request.headers.sdtpversion === SDTPVersion) {
            var message = this.request.body;
            if(message.method === 'update') {
                if(checkToken(message)) {
                    var token = AccessTokens.findOne({_id:message.token});
                    var subscription = getSubscription(token.userId);
                    if(subscription !== undefined) {
                        subscription.added('sensorData', Random.id(), {
                            sensorId:message.id,
                            data:message.data,
                            date:message.date
                        });
                    }
                    this.response.end('Updated');
                }
                else {
                    throwError(this.response, 'Invalid access token.');
                }
            }
            else if(message.method === 'register') {
                if(registerToken(message)) {
                    this.response.end('Registered');
                }
                else {
                    throwError(this.response, 'Registration failed.');
                }
            }
            else {
                throwError(this.response, 'Invalid method.');
            }
        }
        else {
            throwError(this.response, ('Invalid protocol version. Please update to SDTP version ' + SDTPVersion + '.'));
        }
    });

function throwError(res, error) {
    res.end('Error thrown with message: ' + error);
}

var registerToken = function(message) {
    if(AccessTokens.find({_id:message.token, sensor:undefined}).count() > 0) {
        AccessTokens.update({_id:message.token, sensor:undefined}, {$set:{sensor:message.id, type:message.type, location:message.location, tags:message.tags}});
        return true;
    }
    else {
        return false;
    }
}

var checkToken = function(message) {
    var token = AccessTokens.findOne({_id:message.token});
    if(token !== undefined) {
        if(token.sensor === message.id) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

var getSubscription = function(userId) {
    var found = false;
    var i = 0;
    while(!found && i < SensorDataSubscriptions.length) {
        if(SensorDataSubscriptions[i].userId = userId) {
            found = true;
        }
        else {
            i++;
        }
    }
    if(found) {
        return SensorDataSubscriptions[i].subscription;
    }
    else {
        return undefined;
    }
}
