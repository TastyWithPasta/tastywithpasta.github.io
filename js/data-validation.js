document.addEventListener('DOMContentLoaded', function(e) {
var forEach = Array.prototype.forEach;

var ruleNames = [];

var ruleElements = document.querySelectorAll("span[data-rule]");
forEach.call(ruleElements, function(element) {
    var ruleName = element.getAttribute("data-rule");
    ruleNames.push(ruleName);
});

var validate = function (currentEvent) {
    
    console.log("=== Validate called for leaving element " + currentEvent.currentTarget + " ===")

    //First, hide all rule-breaking messages
    var messages = document.querySelectorAll(".validation-messages span");
    forEach.call(messages, function(message){
        message.classList.add("hide");
    });

    //Second, check validity of the entire document. This will trigger the oninvalid event for any invalid input element.
    //Check bookmark at end of page to see where the events are plugged.
    document.getElementById("login-form").checkValidity();

};

var checkRule = function(validityState, ruleNameToCompare, element) {
    
    console.log("=== CheckRule called for state " + validityState + ", rule " + ruleNameToCompare + " and element " + element +" ===")
    console.log("Class of next sibling of element is: " + element.nextElementSibling.classList[0])
    //If the rule exists
    if (validityState[ruleNameToCompare]) {
        // Gets the rules associated with the element (placed as a group of spans in the next sibling div - see html)
        var rules = element.nextElementSibling.querySelectorAll('[data-rule="' + ruleNameToCompare + '"]');
        // Remove the .hide class for all matching rule spans.
        forEach.call(rules, function(rule) {
            rule.classList.remove('hide');
            console.log("Rule match found for rule " + ruleNameToCompare);
        });
    }
};

var validationFail = function(currentEvent) {
    
    var element, validity;

    element = currentEvent.currentTarget;
    validity = element.validity;

    console.log("=== ValidationFail called for element " + element + " ===")
    console.log("Type of event:" + typeof(currentEvent));
    console.log("Validity State: " + typeof(validity.valid), +" " + validity.valid);

    if(!validity.valid) {
        ruleNames.forEach(function(ruleName) {
            checkRule(validity, ruleName, element);
        });
    }
};

// Attaches validation event handlers to 
// all input elements that are NOT buttons.
var inputElements = document.querySelectorAll('input:not(button)');
forEach.call(inputElements, function(input) {
    input.oninvalid = validationFail; // Triggered during the checkValidity native function, which is called during validate(). The event is passed to the function if it takes it as a parameter
    input.onblur = validate; // Validate is called when the user leaves any of the input fields. This calls it for the whole page so it's not fully efficient!
});

console.log(document.getElementById('validate-button'));
document.getElementById('validate-button').addEventListener("clicked", validate, false);

});