// This script is made to add elements to the page easily and automagically,
// in order to study js objects and prototypes more efficiently.

// Displays any object passed through in HTML
// Arguments can be taken even if not explicitely defined ?! Wow
function display() {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'object') 
        displayObject(arguments[i])
      else
        displayValue(arguments[i], true)
    }
  }
  
  // Displays any object passed through in HTML
  function displayObject(object) {
    if (object == null)
      displayValue('null')
    displayValue(getTypeName(object) + ' {')
    for(var propertyName in object) {
      if (propertyName != 'constructor') {
        displayValue(propertyName + ': ' + object[propertyName], false, true);
      }
    }
    displayValue('}', true)
  }
  

  // Creates a div, formats it and adds it to the body of the page.
  function displayValue(value, addMargin, addPadding) {
    var div = document.createElement('div');
    div.style.fontSize='32px'
    if (addMargin)
      div.style.marginBottom='30px'
    if (addPadding)
      div.style.paddingLeft='30px'
    div.textContent = value;
    document.body.appendChild(div)
  }
  
  function getTypeName(object) {
     var funcNameRegex = /function (.{1,})\(/;
     var results = (funcNameRegex).exec(object.constructor.toString());
     return (results && results.length > 1) ? results[1] : "";
  }