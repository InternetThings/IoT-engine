var conditions = [];

CreateCondition = function(sensor, operator, targetValue) {
  var succes = false;
  var newCondition = {
    sensor_id: sensor.sensor_id,
    operator: operator,
    targetValue: targetValue
  }
  if (ValidateCondition(newCondition)) {
    conditions.push(newCondition);
    succes = true;
  } else {
    throw new Error("Condition could not be created.");
  }
  return succes;
}

CreateRuleSet = function(message) {
  var succes = false;
  var newRuleSet = {
    message: message,
    conditions: conditions,
    timeOfEvent: undefined
  }
  if (ValidateRuleSet(newRuleSet)) {
    RuleSets.insert(newRuleSet);
    succes = true;
    conditions = [];
  } else {
    throw new Error("RuleSet could not be created.");
  }
  return succes;
}
