//SDTP Protcol version
SDTPVersion = '1.0'

Router.route('/sensors', {where:'server'})
    .post(function() {
        if(this.request.headers.sdtpversion === SDTPVersion) {
            var message = this.request.body;
            if(checkToken(message.token)) {
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
