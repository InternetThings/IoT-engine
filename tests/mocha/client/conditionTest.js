MochaWeb.testOnly(function() {
  var expectedCondition;
  var accessToken;

  before(function() {
    accessToken = {
      _id: 1
    }

    expectedCondition = {
      accessToken_id: undefined,
      operator: ">",
      targetValue: 15
    }

    expectedCondition.accessToken_id = accessToken._id;
  });

  describe('create condition', function() {
    it('creates a condition', function() {
      var actualCondition = CreateCondition(accessToken._id, ">", 15);
      chai.assert.deepEqual(actualCondition, expectedCondition);
    });
  });

  /**
    describe('evaluate conditions', function() {
      //TODO Update
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
    **/
});
