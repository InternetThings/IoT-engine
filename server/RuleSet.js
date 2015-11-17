var conditions = [];

function CreateCondition(sensor, operator, targetValue) {
  var newCondition = {
    sensor_id: sensor._id,
    operator: operator,
    targetValue: targetValue
  }
  conditions.push(newCondition);
}

function CreateRuleSet(message, conditions) {
  var newRuleSet = {
    message: message,
    conditions: conditions,
    timeOfEvent: undefined
  }
  ruleSets.push(newRuleSet);
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
}
