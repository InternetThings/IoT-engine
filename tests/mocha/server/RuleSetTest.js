MochaWeb.testOnly(function() {
  describe('validate a ruleset', function() {
    var ruleSet;
    var condition1;
    var date;
    before(function() {
      ruleSet = {
        message: "",
        conditions: [],
        timeOfEvents: []
      }
      condition1 = {
        sensor_id: 1,
        result: true
      }
    });

    it('checks message', function() {
      ruleSet.message = "The temperature is now 35 degrees..."
      chai.assert(ruleSet.message !== null && ruleSet.message !== undefined && ruleSet.message !== "");
    });

    it('checks conditions', function() {
      ruleSet.conditions.push(
        condition1
      );
      chai.assert(ruleSet.conditions.length !== 0);
    });

    it('checks timeOfEvents', function() {
      date = new Date();
      ruleSet.timeOfEvents.push(
        date
      );
      chai.assert(ruleSet.timeOfEvents.length !== 0);
    });
  });

  describe('evaluate conditions', function() {
    var sensor;
    var condition1;
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
