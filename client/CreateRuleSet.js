Template.CreateRuleSetPage.onCreated(function() {
  Meteor.subscribe('sensors');
  Meteor.subscribe('ruleSets');
  Session.set('conditions', []);
  Session.set('list_conditionInfo', []);
});

Template.CreateRuleSetPage.events({
  'click #AddConditionbtn': function(event) {
    event.preventDefault();
    var accessToken_id = $('#sensorList').val();
    var operator = $('#operatorValue').val();
    var targetValue = $('#targetValue').val();

    try {
      var condition = CreateCondition(accessToken_id, operator, targetValue);
      var temp_list = Session.get('conditions');
      temp_list.push(condition);
      Session.set('conditions', temp_list);
      $('#targetValue').val("");
    } catch (error) {
      Session.set('error-text', error.message);
    }
  },

  'click #SaveRuleSetbtn': function(event) {
    event.preventDefault();
    var title = $('#title').val();
    var message = $('#message').val();
    var list_of_conditions = Session.get('conditions');

    Meteor.call('CreateRuleSet', title, message, list_of_conditions, function(error) {
      if (error) {
        Session.set('error-text', error.message);
      } else {
        $('#message').val("");
        $('#title').val("");
        Session.set('conditions', []);
      }
    });
  },

  'change #rulesetList': function() {
    var temp_list = [];
    var conditionInfo;
    var accessToken;
    var ruleset_id = $('#rulesetList').val();
    var ruleset = RuleSets.findOne({
      _id: ruleset_id
    });

    ruleset.conditions.forEach(function(condition) {
      accessToken = AccessTokens.findOne({
        _id: condition.accessToken_id
      });

      conditionInfo = {
        sensor: accessToken.sensor,
        type: accessToken.type,
        location: accessToken.location,
        operator: condition.operator,
        targetValue: condition.targetValue
      }
      temp_list.push(conditionInfo);

    });

    function sort_conditionInfo(a, b) {
      if (a.sensor < b.sensor)
        return -1;
      if (a.sensor > b.sensor)
        return 1;
      return 0;
    }

    temp_list.sort(sort_conditionInfo);

    Session.set('list_conditionInfo', temp_list);
  }
});

Template.CreateRuleSetPage.helpers({
  'get_conditionInfo': function() {
    var conditions = [];
    conditions = Session.get('conditions');
    var accessTokenInfo;
    var conditionInfo;
    var results = [];
    if (conditions.length !== 0) {
      conditions.forEach(function(condition) {
        accessTokenInfo = AccessTokens.findOne({
          _id: condition.accessToken_id
        });
        conditionInfo = {
          sensor: accessTokenInfo.sensor,
          type: accessTokenInfo.type,
          location: accessTokenInfo.location,
          operator: condition.operator,
          targetValue: condition.targetValue,
        }
        results.push(conditionInfo);
      });
    }

    function sort_conditionInfo(a, b) {
      if (a.sensor < b.sensor)
        return -1;
      if (a.sensor > b.sensor)
        return 1;
      return 0;
    }
    results.sort(sort_conditionInfo);

    return results;
  },

  'get_ruleset_conditionInfo': function() {
    return Session.get('list_conditionInfo');
  }
});

Template.list_of_sensors.helpers({
  'get_accessTokens': function() {
    return AccessTokens.find({}, {
      sort: {
        sensor: 1
      }
    }, {
      fields: {
        _id: 1,
        sensor: 1,
        location: 1,
        type: 1
      }
    });
  }
});

Template.list_of_rulesets.helpers({
  'get_rulesets': function() {
    return RuleSets.find({}, {
      sort: {
        title: 1
      }
    }, {
      fields: {
        title: 1,
      }
    });
  }
});
