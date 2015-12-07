//Global client function that creates a condition object.
CreateCondition = function(accessToken_id, operator, targetValue) {
    var newCondition = {
        accessToken_id: accessToken_id,
        operator: operator,
        targetValue: targetValue,
        fulfilled: false
    }
    if (!ValidateCondition(newCondition)) {
        throw new Error("Condition could not be created.");
    }
    return newCondition;
}
