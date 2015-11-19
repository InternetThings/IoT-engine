MochaWeb.testOnly(function() {
  var ruleSet;
  var condition;
  var sensor;
  describe('validate a ruleset', function() {
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
      chai.assert.equal(CreateCondition(sensor, condition.operator, condition.targetValue), true);
    });
  });

  describe('create ruleSet', function() {
    it('creates a ruleSet', function() {
      var newMessage = "Please water my plants while im gone. Thank you.";
      chai.assert.equal(CreateRuleSet(newMessage), true);
    });
  });

  describe('evaluate conditions', function() {
    before(function() {
      sensor = {
        sensor_id: 1,
        data: 17
      }

      condition2 = {
        sensor_id: 1,
        operator: "",
        targetValue: 15
      }
    });

    it('is greater than', function() {
      condition2.operator = ">";
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
    });

    it('is less than', function() {
      condition2.operator = "<";
      condition2.targetValue = 20;
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
    });

    it('is greater than or equal', function() {
      condition2.operator = ">=";
      condition2.targetValue = 17;
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
      condition2.targetValue = 15;
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
    });

    it('is less than or equal', function() {
      condition2.operator = "<=";
      condition2.targetValue = 17;
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
      condition2.targetValue = 20;
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
    });

    it('is equal', function() {
      condition2.operator = "=";
      condition2.targetValue = 17;
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
    });

    it('is not equal', function() {
      condition2.operator = "!=";
      condition2.targetValue = 15;
      var result = EvaluateCondition(sensor, condition2);
      chai.assert.equal(result, true);
    });
  });
});
