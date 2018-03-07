document.addEventListener('DOMContentLoaded', function(e) {
    if(!Modernizr.canvas) {
        return;
    }
    
    var canvas = document.getElementById('canvas-animating');
    var context = canvas.getContext('2d');

});