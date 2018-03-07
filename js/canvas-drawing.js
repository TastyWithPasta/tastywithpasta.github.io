document.addEventListener('DOMContentLoaded', function(e) {
    if(!Modernizr.canvas) {
        return;
    }
    
    var canvas = document.getElementById('canvas-drawing');
    var context = canvas.getContext('2d');

    ////////////////////////////// Simple Triangle \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var trianglePos = {
        x: 25,
        y: 50
    };
    context.beginPath();
    context.moveTo(trianglePos.x + 50, trianglePos.y);
    context.lineTo(trianglePos.x + 50, trianglePos.y + 50);
    context.lineTo(trianglePos.x, trianglePos.y + 50);
    context.fill();

    ////////////////////////////// Complex Styled Shape \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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


    ////////////////////////////// Filled Rectangles \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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


    ////////////////////////////// Gradients n' shit \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var g1 = context.createRadialGradient(
        460, // X coordinate of grad. start
        120, // Y coordinate of grad. start
        0,   // Radius of the start circle
        720, // X coordinate of grad. end
        220, // Y coordinate of grad. end
        300);// Radius of the end circle
    g1.addColorStop(0, '#ffffff');
    g1.addColorStop(1, '#999999');
  
    // base circle
    context.lineWidth = 0;
    context.strokeStyle = '#000000';
    context.fillStyle = g1;
    context.beginPath();
    context.arc(
        580,        // X coordinate of arc start
        180,        // Y coordinate of arc start
        160,        // Radius
        0,          // Start angle
        Math.PI * 2,// End angle
        true);      // Anticlockwise
  
    context.fill();
  
    var g2 = context.createRadialGradient(760, 320, 0, 660, 220, 200);
    g2.addColorStop(0, '#ffffff');
    g2.addColorStop(1, '#999999');
  
    // inner circle
    context.fillStyle = g2;
    context.beginPath();
    context.arc(580,
                180,
                130,
                0,
                Math.PI * 2,
                true);
    context.fill();
  
    context.fillStyle = '#ffffff';
    context.font = '280px Arial';
    context.fillText('C', 480, 280);
});