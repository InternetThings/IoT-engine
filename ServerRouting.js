//SDTP Protcol version
SDTPVersion = '1.0'

Router.route('/sensors', {where:'server'})
    .post(function() {
        if(this.request.headers.sdtpversion === SDTPVersion) {
            var message = this.request.body;
            if(checkToken(message.token)) {
                var userId = AccessTokens.findOne({tokens:message.token}).userId;
                var subscription = getSubscription(userId);

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
                throwError(this.response, ('Invalid access token.'));
            }
        }
        else {
            throwError(this.response, ('Invalid protocol version. Please update to SDTP version ' + SDTPVersion + '.'));
        }
    });

function throwError(res, error) {
    res.end('Error thrown with message: ' + error);
}

var checkToken = function(token) {
    return AccessTokens.find({tokens:token}).count() > 0;
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
