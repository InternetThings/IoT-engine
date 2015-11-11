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
