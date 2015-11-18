var conditions = [];

CreateCondition = function(sensor, operator, targetValue) {
  var newCondition = {
    sensor_id: sensor.sensor_id,
    operator: operator,
    targetValue: targetValue
  }
  if (ValidateCondition(newCondition)) {
    conditions.push(newCondition);
  } else {
    throw new Error("Condition could not be created.");
  }
}

CreateRuleSet = function(message) {
  var newRuleSet = {
    message: message,
    conditions: conditions,
    timeOfEvent: undefined
  }
  if (ValidateRuleSet(newRuleSet)) {
    ruleSets.push(newRuleSet);
  } else {
    throw new Error("RuleSet could not be created.");
  }
}
