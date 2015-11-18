MochaWeb.testOnly(function() {
  describe('validate a ruleset', function() {
    var ruleSet;
    var condition;
    var sensor;
    before(function() {
      ruleSet = {
        message: "",
        conditions: []
      }
      condition = {
        sensor_id: 1,
        operator: ">",
        targetValue: 15
      }
      sensor = {
        sensor_id: 1
      }
    });

    it('checks message.', function() {
      ruleSet.conditions.push(condition);
      try {
        ValidateRuleSet(ruleSet);
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "No message attached.");
      }
    });

    it('checks condition.', function() {
      ruleSet.message = "The temperature is now 35 degrees..."
      try {
        ValidateRuleSet(ruleSet);
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "No condition defined.");
      }
    });
  });

  describe('create condition', function() {
    it('creates a condition', function() {
      try {
        CreateCondition(sensor, condition.operator, condition.targetValue);
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "Condition could not be created.");
      }
    });
  });

  describe('create ruleSet', function() {
    it('creates a ruleSet', function() {
      CreateCondition(sensor, condition.operator, condition.targetValue);
      var newMessage = "Please water my plants while im gone. Thank you.";
      try {
        CreateRuleSet(newMessage);
      } catch (error) {
        chai.assert(error instanceof Error);
        chai.assert(error.message === "RuleSet could not be created.");
      }
    });
  });

  describe('evaluate conditions', function() {
    before(function() {
      sensor = {
        sensor_id: 1,
        data: 17
      }

      condition = {
        sensor_id: 1,
        operator: "",
        targetValue: 15
      }
    });

    it('is greater than', function() {
      condition.operator = ">";
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
    });

    it('is less than', function() {
      condition.operator = "<";
      condition.targetValue = 20;
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
    });

    it('is greater than or equal', function() {
      condition.operator = ">=";
      condition.targetValue = 17;
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
      condition.targetValue = 15;
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
    });

    it('is less than or equal', function() {
      condition.operator = "<=";
      condition.targetValue = 17;
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
      condition.targetValue = 20;
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
    });

    it('is equal', function() {
      condition.operator = "=";
      condition.targetValue = 17;
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
    });

    it('is not equal', function() {
      condition.operator = "!=";
      condition.targetValue = 15;
      var result = EvaluateCondition(sensor, condition);
      chai.assert.equal(result, true);
    });
  });
});
