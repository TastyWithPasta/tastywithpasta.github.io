// Called whdn window is ready
window.onload = function(){
    this.console.log("Window has loaded.");
};

// Called when DOM is ready.
$(document).ready(function(){
    console.log("DOM has loaded.");
    //SelectorsDemo();
    DomAlterationDemo();
});

/// GO TO http://codylindley.com/jqueryselectors/ FOR PRACTICE! \\\
function SelectorsDemo() {
    // Change content all paragraphs in the container with idToSelect ID
    $('#idToSelect p').html("Div 1. (Content changed)");

    // Change background color of all divs with class "classToSelect"
    $('div.classToSelect').css('background-color', 'green');

    // Dump the html content of each div
    $('div').each(function() {
        console.log('Each function div dump: ' + $(this).html());
    });

    // Dots the formatting of the list with the title "A List"
    $('ul[title="A List"]').css('border', '2px dotted black')

    // Selects the first of any li items and changes its contents
    $('li:first-child').html("List Item 1 (Content changed by ul:first-child)");

    // Selects all inputs, and extracts the value of the second one.
    var inputs = $(':input');
    console.log("Second input value: " + $(inputs[1]).val()); // Lionet

    // Select all divs containing "Div 3"
    $('div:contains("Div 3")').html("Div 3. (Selected and changed by looking for 'Div 3')");
}

function DomAlterationDemo() {
     // Replaces content of the first 3 li elements
     // Function can be called alone or with just index, as element is $(this).
     $('li').each(function(index, element) {
        if(index < 3)
            $(element).html('List Item ' + (index+1) + ' (Changed by iterating with each, and selecting indices below 3)');
    });
}