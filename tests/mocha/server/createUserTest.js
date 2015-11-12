MochaWeb.testOnly(function() {
  describe('validating user information', function() {
    before(function() {
      Meteor.users.remove({});
      var username = "";
      var email = "";
      var passwordFirst = "";
      var passwordSecond = "";
    });

    it('checks username', function() {
      username = "test";
      chai.assert(username !== null && username !== undefined && username !== "");
    });

    it('checks email', function() {
      email = "test@test.test";
      chai.assert(email !== null && email !== undefined && email !== "");
    });

    it('checks first password', function() {
      passwordFirst = "123";
      chai.assert(passwordFirst !== null && passwordFirst !== undefined && passwordFirst !== "");
    });

    it('checks second password', function() {
      passwordSecond = "123";
      chai.assert(passwordSecond !== null && passwordSecond !== undefined && passwordSecond !== "");
    });

    describe('passwords match each other.', function() {
      it('Passwords match.', function() {
        var passwordFirst = "123";
        var passwordSecond = "123";
        chai.assert(passwordFirst === passwordSecond);
      });

      it('Passwords do not match.', function() {
        var passwordFirst = "123";
        var passwordSecond = "321";
        chai.assert(passwordFirst !== passwordSecond);
      });
    });

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
      });
    });
  });
});
