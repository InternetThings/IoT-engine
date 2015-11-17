ValidateUserInformation = function(newUsername, newUserEmail, passwordFirst, passwordSecond) {

  var valid = true;
  if (newUsername !== null && newUsername !== undefined && newUsername !== '') {} else {
    valid = false;
    throw new Error("No username was entered.");
  }

  if (newUserEmail !== null && newUserEmail !== undefined && newUserEmail !== '') {} else {
    valid = false;
    throw new Error("No email was entered.");
  }

  if (passwordFirst !== null && passwordFirst !== undefined && passwordFirst !== '') {} else {
    valid = false;
    throw new Error("First password was not entered.");
  }

  if (passwordSecond !== null && passwordSecond !== undefined && passwordSecond !== '') {} else {
    valid = false;
    throw new Error("Second password was not entered.");
  }

  if (passwordFirst === passwordSecond) {} else {
    valid = false;
    throw new Error("Passwords do not match.");
  }
  return valid;
}

ValidateCondition = function(condition) {
  var valid = true;
  if (condition.sensor_id !== null && condition.sensor_id !== undefined && condition.sensor_id !== '') {} else {
    valid = false;
    throw new Error("No sensor_id attached.");
  }

  if (condition.operator !== null && condition.operator !== undefined && condition.operator !== '') {} else {
    valid = false;
    throw new Error("No operator chosen.");
  }

  if (condition.targetValue !== null && condition.targetValue !== undefined && condition.targetValue !== '') {} else {
    valid = false;
    throw new Error("No target value set.");
  }
  return valid;
}

ValidateRuleSet = function(ruleSet) {
  var valid = true;
  if (ruleSet.message !== null && ruleSet.message !== undefined && ruleSet.message !== '') {} else {
    valid = false;
    throw new Error("No message attached.");
  }

  if (ruleSet.conditions !== null && ruleSet.conditions !== undefined && ruleSet.conditions.length !== 0) {} else {
    valid = false;
    throw new Error("No conditions defined.");
  }
  return valid;
}

EvaluateCondition = function(sensor, condition) {
  var eval;
  switch (condition.operator) {
    case ">":
      eval = (sensor.data > condition.targetValue);
      break;
    case "<":
      eval = (sensor.data < condition.targetValue);
      break;
    case ">=":
      eval = (sensor.data >= condition.targetValue);
      break;
    case "<=":
      eval = (sensor.data <= condition.targetValue);
      break;
    case "=":
      eval = (sensor.data === condition.targetValue);
      break;
    case "!=":
      eval = (sensor.data !== condition.targetValue);
      break;
    default:
      eval = false;
  }
  return eval;
}
