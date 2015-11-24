Template.CreateRuleSet.onCreated(function() {
  Session.setDefault('conditions', []);
});

Template.CreateRuleSet.events({
  'click #AddConditionbtn': function(event) {
    event.preventDefault();
    var accessToken = $('#sensorList').val();
    console.log(accessToken);
    var operator = $('#operatorValue').val();
    var targetValue = $('#targetValue').val();

    try {
      var condition = CreateCondition(accessToken, operator, targetValue);
      var temp_list = Session.get('conditions');
      console.log("click add condition" + temp_list);
      temp_list.push(condition);
      Session.set('conditions', temp_list);
      $('#targetValue').val("");
    } catch (error) {
      console.log(error);
    }
  },

  'click #SaveRuleSetbtn': function(event) {
    event.preventDefault();
    var message = $('#message').val();
    var list_of_conditions = Session.get('conditions');
    console.log("click save rulset" + list_of_conditions);
    Meteor.call('CreateRuleSet', message, list_of_conditions, function(error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
        $('#message').val("");
        Session.set('conditions', []);
      }
    });
  }
});

Template.CreateRuleSet.helpers({
  'get_conditions': function() {
    return Session.get('conditions');
  }
});

Template.list_of_sensors.helpers({
  'get_accessTokens': function() {
    return AccessTokens.find({}, {
      fields: {
        _id: 1,
        location: 1,
        type: 1
      }
    });
  }
});

Template.list_of_rulesets.helpers({
  'get_rulesets': function() {
    return RuleSets.find({});
  }
});
