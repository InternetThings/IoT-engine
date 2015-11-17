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

ValidateRuleSet = function(message, conditions) {

  var valid = true;
  if (message !== null && message !== undefined && message !== '') {
  } else {
    valid = false;
    throw new Error("No message attached.");
  }

  if (conditions !== null && conditions !== undefined && conditions.length() !== 0) {
  } else {
    valid = false;
    throw new Error("No conditions defined.");
  }
}
