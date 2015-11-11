MochaWeb.testOnly(function() {
    before(function() {
        AccessTokens.remove({});
    });

    describe('access tokens collection', function() {
        it('should be empty on startup', function() {
            chai.assert.equal(AccessTokens.find().count(), 0);
        })
    })
})
