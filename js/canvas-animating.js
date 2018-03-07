document.addEventListener('DOMContentLoaded', function(e) {
    if(!Modernizr.canvas) {
        return;
    }
    
    var canvas = document.getElementById('canvas-animating');
    var context = canvas.getContext('2d');

    function degreesToRadians(degrees) {
        var radians = degrees * (Math.PI / 180)
        return radians;
    }

    

    ////////////////////////////// Rotated & Scaled Dog \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var img = new Image();
    img.onload = function() {
        context.setTransform(1, 0, 0, 1, 0, 0);  // Resets the transform matrix
        context.translate(25, 100);
        context.scale(2, 2.5);
        context.rotate(degreesToRadians(-45));
        context.drawImage(img, 0, 0);
    }
    img.src = "media/thisdog_small.png"
    

    ////////////////////////////// Text + Image \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var text = ""
    var img2 = new Image();
    img2.onload = function() {
        context.setTransform(1, 0, 0, 1, 0, 0);  // Resets the transform matrix
        context.translate(350, 35);

        context.fillStyle = '#ffffff';
        context.strokeStyle = '#000000';
        context.lineWidth = 6;

        text = 'This dog';
        context.font = '1em Arial';
        context.strokeText(text, 0, -10);
        context.fillText(text, 0, -10);

        text = 'I Like This Dog';
        context.strokeText(text, 0, 175);
        context.fillText(text, 0, 175);
        
        context.scale(1.5,1.5);
        context.drawImage(img2, 0, 0);
    }
    img2.src = 'media/thisdogagain_small.png';  


    ////////////////////////////// Animation \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    var x = 0;
    var draw = function() {
        context.setTransform(1, 0, 0, 1, 0, 0);  // Resets the transform matrix
        x = (x + 10) % canvas.width;
        context.clearRect(0, 300, canvas.width, 20);
        context.strokeStyle = 'rgb(139, 0, 0)';
        context.lineWidth = 8;
        context.beginPath();
        context.moveTo(0, 300);
        context.lineTo(x, 300);
        context.stroke();
    }

    //The draw() function is called every 5 milliseconds
    var frame = setInterval(function() {
        draw();
    }, 25);


    ////////////////////////////// Clipping \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    var img3 = new Image();
    img3.onload = function() {
        context.setTransform(1, 0, 0, 1, 0, 0);  // Resets the transform matrix
        
        // Draw the circle clipping
        context.translate(600, 20);
        context.save();                 //Save context before clipping
        context.arc(50, 50, 50, 0, Math.PI * 2);
        context.clip();
        context.drawImage(img3, 0, 0);
        context.lineWidth = 15;
        context.strokeStyle = '#ffffff'
        context.stroke();
        context.restore();  // Restore the context once the clipped image has been drawn.

        // Draw the rectangle
        context.translate(0, 100);
        context.save();                 //Save context before clipping
        context.rect(10, 10, 80, 80);
        context.clip();
        context.drawImage(img3, 0, 0);
        context.lineWidth = 15;
        context.strokeStyle = '#ffffff'
        context.stroke();
        context.restore();  // Restore the context once the clipped image has been drawn.

    }
    img3.src = "media/thisdog_small.png"
});