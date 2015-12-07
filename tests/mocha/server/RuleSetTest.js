//Server side ruleset testing
MochaWeb.testOnly(function() {
    var ruleSetWithoutTitle;
    var ruleSetWithoutMessage;
    var ruleSetWithoutCondition;

    before(function() {
        RuleSets.remove({});
        Notifications.remove({});
    })

    describe('validate a ruleset', function() {
        before(function() {
            ruleSetWithoutMessage = {
                title: "Leaving for holiday notification",
                message: "",
                conditions: [{
                    accessToken: 1,
                    operator: ">",
                    targetValue: 15
                }]
            }

            ruleSetWithoutTitle = {
                title: "",
                message: "Please water my plants while im gone. Thank you.",
                conditions: [{
                    accessToken: 1,
                    operator: ">",
                    targetValue: 15
                }]
            }

            ruleSetWithoutCondition = {
                title: "Leaving for holiday notification",
                message: "Please water my plants while im gone. Thank you.",
                conditions: undefined
            }
        });

        it('checks title.', function() {
            try {
                ValidateRuleSet(ruleSetWithoutTitle);
            }
            catch (error) {
                chai.assert(error instanceof Error);
                chai.assert(error.message === "No title defined.");
            }
        });

        it('checks message.', function() {
            try {
                ValidateRuleSet(ruleSetWithoutMessage);
            }
            catch (error) {
                chai.assert(error instanceof Error);
                chai.assert(error.message === "No message defined.");
            }
        });

        it('checks conditions.', function() {
            try {
                ValidateRuleSet(ruleSetWithoutCondition);
            }
            catch (error) {
                chai.assert(error instanceof Error);
                chai.assert(error.message === "No conditions defined.");
            }
        });
    });
});
