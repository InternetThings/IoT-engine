/*
Server routing. Here goes handler for http requests, that is used for receiving data from the sensors.
This part of the backend is the core of how we handle data without storing it on the server. Data is received, parsed and pushed to relevant client.
After parsing the data is no longer stored on the server.
*/
//SDTP Protcol version. Messages must use same version for the server to accept them.
SDTPVersion = '1.0'

//Server routing, code will only run server side thus allowing for access to server side elements. This is where data messages are received.
Router.route('/sensors', {
        where: 'server'
    })
    .post(function() {
        //First make sure that the message uses the same protocol version.
        if (this.request.headers.sdtpversion === SDTPVersion) {
            var message = this.request.body;
            //Check method field, this indicates what type of message this is.
            if (message.method === 'update') {
                //Update messages send data from a previously registered sensor.
                if (checkToken(message)) {
                    //Push the data to the data queue where it will be parsed to check for notifications.
                    DataQueue.push({
                        data: message.data,
                        token: message.token
                    });
                    //Push the data to relevant subscribers.
                    getSubscriptions(message.token).forEach(function(value) {
                        value.added('sensorData', Random.id(), {
                            sensorId: message.token,
                            data: message.data,
                            date: message.date
                        });
                    });
                    //Send response to the sender indicating that the post was successful.
                    this.response.end('Updated');
                }
                else {
                    throwError(this.response, 'Invalid access token.');
                }
            }
            else if (message.method === 'register') {
                //Register messages register a new sensors with an access token.
                if (registerToken(message)) {
                    //Send response to the sender indicating that the post was successful.
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

//Helper function that throws an error message with the response object.
function throwError(res, error) {
    res.end('Error thrown with message: ' + error);
}

//Helper function that registers a sensor from a register message.
var registerToken = function(message) {
    //Check for an uncomsumed access token and tie the sensor to that token.
    if (AccessTokens.find({
            _id: message.token,
            sensor: undefined
        }).count() > 0) {
        AccessTokens.update({
            _id: message.token,
            sensor: undefined
        }, {
            $set: {
                sensor: message.id,
                type: message.type,
                location: message.location,
                tags: message.tags
            }
        });
        return true;
    }
    else {
        return false;
    }
}

//Check if a token is valid.
var checkToken = function(message) {
    var token = AccessTokens.findOne({
        _id: message.token
    });
    if (token !== undefined) {
        if (token.sensor === message.id) {
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

//Get subscriptions related to a specific access token.
var getSubscriptions = function(token) {
    var subscriptions = [];
    SensorDataSubscriptions.forEach(function(value) {
        if (value.tokens.indexOf(token) !== -1) {
            subscriptions.push(value.subscription);
        }
    });
    return subscriptions;
}
