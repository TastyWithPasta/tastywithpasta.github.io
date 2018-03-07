document.addEventListener('DOMContentLoaded', function(e) {
    if(!Modernizr.canvas) {
        return;
    }
    
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // Draw Triangle
    var trianglePos = {
        x: 25,
        y: 50
    };
    context.beginPath();
    context.moveTo(trianglePos.x + 50, trianglePos.y);
    context.lineTo(trianglePos.x + 50, trianglePos.y + 50);
    context.lineTo(trianglePos.x, trianglePos.y + 50);
    context.fill();

    // Draw Styled Shapamajig
    var rectanglePos = {
        x: 100,
        y: 100
    };
    context.beginPath();
    context.moveTo(rectanglePos.x, rectanglePos.y);
    context.lineTo(rectanglePos.x, rectanglePos.y + 200);
    context.lineTo(rectanglePos.x + 50, rectanglePos.y + 200);
    context.lineTo(rectanglePos.x + 50, rectanglePos.y + 55);
    context.lineTo(rectanglePos.x + 105, rectanglePos.y + 55);
    context.lineTo(rectanglePos.x + 105, rectanglePos.y);
    context.closePath();
    context.fillStyle = '#0099ff'
    context.fill();
    context.lineWidth = 6;
    context.lineJoin = 'round';
    context.strokeStyle = '#cccccc'
    context.stroke();


    // Fill Rectangles
    var fillRectPos = {
        x: 250,
        y: 50
    };
    context.fillStyle = 'rgb(500,0,0)'
    context.fillRect(fillRectPos.x, fillRectPos.y, 100, 100);           // Draw filled red rectangle
    context.fillStyle = 'rgba(0,0,500,0.5)'                             // Draw semi-transparent blue rectangle
    context.fillRect(fillRectPos.x + 30, fillRectPos.y + 30, 100, 100); 
    context.clearRect(fillRectPos.x + 65, fillRectPos.y + 65, 20, 20);  // Clear all colours in a rectangle space
    context.strokeStyle = 'rgb(51,153,0)'                               // Draw outlines around the cleared rectangle
    context.lineWidth = 6;
    context.strokeRect(fillRectPos.x + 65, fillRectPos.y + 65, 20, 20);
});