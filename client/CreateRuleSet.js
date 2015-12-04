Template.CreateRuleSetPage.onCreated(function() {
  Meteor.subscribe('sensors');
  Meteor.subscribe('ruleSets');
  Session.set('conditions', []);
  Session.set('list_conditionInfo', []);
  Session.setDefault('selectedSensor', undefined);
  Session.setDefault('selectedOperator', undefined);
});

Template.CreateRuleSetPage.events({
    'click .operatorItem':function(event) {
        event.preventDefault();
        Session.set('selectedOperator', event.currentTarget.id);
    },

    'click .sensorItem':function(event) {
        event.preventDefault();
        Session.set('selectedSensor', event.currentTarget.id);
    },

  'click #AddConditionbtn': function(event) {
    event.preventDefault();
    var accessToken_id = Session.get('selectedSensor');
    var operator = Session.get('selectedOperator');
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
    title = title.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    var message = $('#message').val();
    message = message.charAt(0).toUpperCase() + message.substr(1);
    var list_of_conditions = Session.get('conditions');

    Meteor.call('CreateRuleSet', title, message, list_of_conditions, function(error) {
      if (error) {
        Session.set('error-text', error.reason);
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
},

    'list_of_sensors':function() {
        return AccessTokens.find({_id:{$nin:[Session.get('selectedSensor')]}}, {sort:{sensor:1}, fields:{_id:1, sensor:1, location:1, type:1}});
    },

    'selectedSensor':function() {
        return AccessTokens.findOne({_id:Session.get('selectedSensor')});
    },

    'selectedOperator':function() {
        return Session.get('selectedOperator');
    },

    'operatorList':function() {
        var operatorList = ['>', '<', '>=', '<=', '=', '!='];
        var index = operatorList.indexOf(Session.get('selectedOperator'));
        if(index !== -1) {
            operatorList.splice(index, 1);
        }
        return operatorList;
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
