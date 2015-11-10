//SDTP Protcol version
SDTPVersion = '1.0'

Router.route('/sensors', {where:'server'})
    .post(function() {
        if(this.request.headers.sdtpversion === SDTPVersion) {
            var message = this.request.body;
        }
    });


var checkToken = function(token) {
    var index = AccessTokens.indexOf(token);
    var valid = false;
    if(index !== -1) {
        valid = true;
        AccessTokens.splice(index, 1);
    }
    return valid;
}
