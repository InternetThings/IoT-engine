MochaWeb.testOnly(function() {
  var ruleSetWithoutMessage;
  var ruleSetWithoutCondition;

  describe('validate a ruleset', function() {
    before(function() {
      ruleSetWithoutMessage = {
        message: "",
        conditions: [{
          accessToken: 1,
          operator: ">",
          targetValue: 15
        }]
      }

      ruleSetWithoutCondition = {
        message: "Please water my plants while im gone. Thank you.",
        conditions: undefined
      }
    });

    it('checks message.', function() {
      try {
        ValidateRuleSet(ruleSetWithoutMessage);
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "No message attached.");
      }
    });

    it('checks conditions.', function() {
      try {
        ValidateRuleSet(ruleSetWithoutCondition);
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "No conditions defined.");
      }
    });
  });
});
