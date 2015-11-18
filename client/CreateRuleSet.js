Template.CreateRuleSet.events({
  'click #AddConditionbtn': function(event) {
    event.preventDefault();
    var dataSource = $('#').val();
    var operator = $('#operatorValue').val();
    var targetValue = $('#targetValue').val();

    try {
      CreateCondition(dataSource, operator, targetValue);
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

Template.CreateRuleSet.helpers({
  
});
