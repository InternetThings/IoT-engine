MochaWeb.testOnly(function() {
  describe('validate function exceptions', function() {
    it('no username exception', function() {
      try {
        ValidateUserInformation("", "test@test.test", "123", "123");
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "No username was entered.");
      }
    });

    it('no email exception', function() {
      try {
        ValidateUserInformation("test", "", "123", "123");
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "No email was entered.");
      }
    });

    it('no first password exception', function() {
      try {
        ValidateUserInformation("test", "test@test.test", "", "123");
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "First password was not entered.");
      }
    });

    it('no second password exception', function() {
      try {
        ValidateUserInformation("test", "test@test.test", "123", "");
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "Second password was not entered.");
      }
    });

    it('passwords do not match exception', function() {
      try {
        ValidateUserInformation("test", "test@test.test", "123", "321");
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "Passwords do not match.");
      }
    });
  });
});
