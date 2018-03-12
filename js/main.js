// Called whdn window is ready
window.onload = function(){
    this.console.log("Window has loaded.");
};

// Called when DOM is ready.
$(document).ready(function(){
    console.log("DOM has loaded.");
    $('#myContent').html("Content changed");
});