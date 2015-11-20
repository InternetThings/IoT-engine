MochaWeb.testOnly(function() {
    before(function() {
        AccessTokens.remove({});
    });

    describe('access tokens collection', function() {
        console.log('Running tests?');
        it('should be empty on startup', function() {
            chai.assert.equal(AccessTokens.find().count(), 0);
        });
    });
});
