// Called whdn window is ready
window.onload = function(){
    this.console.log("Window has loaded.");
};

// Called when DOM is ready.
$(document).ready(function(){
    console.log("DOM has loaded.");
    //SelectorsDemo();
    //DomAlterationDemo();
    //EventsDemo_ShortcutFunctions();
    //EventsDemo_OnFunction();
    AjaxDemo();
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

     // Replaces content of the first 3 li elements or changes their title.
     $('li').each(function(index, element) { // Function can be called without element, or without arguments
        if(index < 3) {
            // $(this) is the same as using $(element)
            $(this).html('List Item ' + (index+1) + ' (Changed by iterating with each, and selecting indices below 3)');
            
            $(this).attr('title', 'ListBefore3'); // 
            $(this).attr({
                style: 'border: 2px solid white',
                role: 'nah'
            }); //Done using a JSON object
        } 
        else {
            this.title="ListAfter3"; // this refers to the raw DOM object
        }
    });

    //Example of chaining
    $('body > div').attr({
        title: 'Main Body div'
    }).css({
        'background-color': 'blue'  //CSS can be passed as JSON but need to be quoted.
    })
    .css('color', 'white');

    //Append (add on bottom) elements to first div using append and appendTo
    $('div:first-child').append('<span>This span has been appended to div 1 using append. </span>');
    $('<span>This span has been appended to div 1 using appendTo</span>').appendTo('div:first-child');

    //Prepend (add on top) elements to first div using append and appendTo
    $('div:first-child').prepend('<span>This span has been appended to div 1 using prepend. </span>');
    $('<span>This span has been appended to div 1 using prependTo. </span>').prependTo('div:first-child');

    // Wraps div 2 into another div with class wrapper
    $('div:nth-child(2)').wrap('<div class="wrapper"/>');
    $('.wrapper').css('text-decoration', 'white wavy underline');

    // Removes div 3
    $('div:nth-child(3)').remove();

    // Adds a class to table rows:
    $('tr').addClass('important');

    // Removes class from all odd table rows:
    var selection = $('tr:odd');
    if(selection.hasClass('important'))
        selection.removeClass('important');

    // Toggles the important class of the last table row
    $('tr:last-child').toggleClass('important');
    $('tr:last-child').toggleClass('important');
}


function EventsDemo_ShortcutFunctions() {
    // Double clicking a div element makes it yellow
    $('div').dblclick(function() {
        $(this).toggleClass('yellow');
    });

    // Chaining shortcut functions
    $('div').mouseenter(function() {
        $(this).toggleClass('highlight');
    })
    .mouseleave(function() {
        $(this).toggleClass('highlight');
    })
    .mouseup(function(e){
        $(this).text('X :' + e.pageX + ' Y: ' + e.pageY);
    });

    // Better than mouseenter and mouseleave.
    // Can specify two arguments for enter and leave
    $('div').hover(function() {
        $(this).toggleClass('yellow');
    });

     // Clicking the submit button shows first and last name
     $('#SubmitButton').click(function() {
        var firstName = $('#FirstNameTextBox').val();
        var lastName = $('#LastNameTextBox').val();
        $('#NameOutput').text(firstName + ' ' + lastName);
    });

    // Detecting Changes
    $('#CommentsTextBox').change(function(){
        console.log("change!");
        var outputText = $('#CommentsTextBox').val();
        $('#CommentsOutput').text("Comments" + outputText);
    });
}

//// OPTION 2: Using the 'on' function (same thing as above, but better since handling two events at once) \\\\
function EventsDemo_OnFunction(){

    // Same effect as the chaining in EventsDemo_ShortcutFunctions, but much more efficient to write
    // In this case, 1 div = 1 event handler
    $('div').on('mouseenter mouseleave mouseup', function(e) {
        $(this).toggleClass('highlight');
        if(e.type === 'mouseup') {
            //$(this).text('X :' + e.pageX + ' Y: ' + e.pageY);
        }
    });

    // Also can be done with a "map", a JSON formatted object
    // In this case, 1 div = 1 event handler
    $('div').on({
        mouseenter: function() {
            $(this).toggleClass('yellow');
        },
        mouseleave: function() {
            $(this).toggleClass('yellow');
        }
    });

    // Call event handler on the closest body parent element when a child p is double-clicked.
    // Only ONE event handler mapped to body.
    $( "body" ).on( "dblclick", "p", function() {
        console.log("p element click event handler called!");
    });

    // !!! The live function (deprecated) handles events from the document.
    // If an event is detected, it bubbles up to the document which handles it.
    // Which means only ONE handler, and not one per matching element.
}


// Load, Get, GetJSON, Post
function AjaxDemo() {

    // Load loads HTML DOM elements directly
    $('#LoadButton').click(function() {
        $('#RemoteOutput').load('distantPage_load.html #jQueryDom', function(response, status, xhr) {
            if(status === 'error') {
                alert('Error: ' + xhr.statusText);
            }
        });
    });

    $('#GetButton').click(function() {
        $.get('distantPage_get.html', function(data) {
            console.log("Retrieving data from distantPage_get.html");
            $('#RemoteOutput').html(data);
        });
    });
    $('#GetJSONButton').click(function() {
        $.getJSON('distantPage_getJSON.html', function(data) {
            console.log("Retrieving data from distantPage_getJSON.html");
            $('#RemoteOutput').html(data);
        });
    });
}
