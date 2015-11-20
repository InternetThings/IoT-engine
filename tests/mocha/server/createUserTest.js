/**MochaWeb.testOnly(function() {
  describe('user is created.', function() {
    it('creates user.', function() {
      Accounts.createUser({
        username: "test",
        email: "test@test.test",
        password: "123"
      });

      chai.assert(Meteor.users.findOne({
        username: "test"
      }) !== undefined);

      Meteor.users.remove({username: "test"});
    });
  });
});
**/
