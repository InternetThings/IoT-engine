Template.CreateRuleSet.events({
  'click #AddConditionbtn': function(event) {
    event.preventDefault();
    var sensor = sensors.find();
  },

  'click #SaveRuleSetbtn': function(event) {

  }
});

Template.CreateRuleSet.helpers({
  'get_sensors': function() {

  }
});
