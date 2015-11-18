Template.CreateRuleSet.events({
  'click #AddConditionbtn': function(event) {
    event.preventDefault();
    var sensor = $('#sensorList').val();
    var operator = $('#operatorValue').val();
    var targetValue = $('#targetValue').val();

    try {
      CreateCondition(sensor, operator, targetValue);
    } catch (error) {
      console.log(error);
    }
  },

  'click #SaveRuleSetbtn': function(event) {
    event.preventDefault();
    var message = $('#message').val();

    try {
      CreateRuleSet(message);
    } catch (error) {
      console.log(error);
    }
  }
});

Template.list_of_sensors.helpers({
  'get_accessTokens': function() {
    return AccessTokens.find({}, {
      fields: {
        sensor: 1
      }
    });
  },

  'liste': function() {
    var liste = [1, 2, 3, 4, 5];
    return liste;
  }
});
