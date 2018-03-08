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

    function resetContext()
    {
        context.setTransform(1, 0, 0, 1, 0, 0);  // Resets the transform matrix
        context.moveTo(0,0);
        context.lineWidth = 0;
    }

    ////////////////////////////// Rotated & Scaled Dog \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    // Uses img1. Called only when img2 is loaded (see loading below)
    var drawRotatedScaledImage = function() {
        resetContext();
        context.translate(25, 100);
        context.scale(2, 2.5);
        context.rotate(degreesToRadians(-45));
        context.drawImage(img1, 0, 0);
    };
    

    ////////////////////////////// Text + Image \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    // Uses img2. Called only when img2 is loaded (see loading below)
    var drawTextAndImage = function() {
        var text = ""

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
        context.drawImage(img1, 0, 0);
    };

    
    ////////////////////////////// Animation \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    // The draw function is called every 25 ms by a setInterval function (end of the page)
    var x = 0;
    var drawLine = function() {
        resetContext();
        x = (x + 10) % canvas.width;
        context.clearRect(0, 300, canvas.width, 20);
        context.strokeStyle = 'rgb(139, 0, 0)';
        context.lineWidth = 8;
        context.beginPath();
        context.moveTo(0, 300);
        context.lineTo(x, 300);
        context.stroke();
        context.closePath();
    }


    ////////////////////////////// Clipping \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    var drawClippedCircle = function () {
        resetContext();
        context.translate(550, 20);
        context.save();                 //Save context before clipping
        context.arc(50, 50, 50, 0, Math.PI * 2);
        context.clip();
        context.drawImage(img2, 0, 0);
        context.lineWidth = 15;
        context.strokeStyle = '#ffffff'
        context.stroke();
        context.restore();  // Restore the context once the clipped image has been drawn.
    };
    var drawClippedRectangle = function() {
        resetContext();
        context.translate(550, 120);
        context.save();                 //Save context before clipping
        context.rect(10, 10, 80, 80);
        context.clip();
        context.drawImage(img2, 0, 0);
        context.lineWidth = 15;
        context.strokeStyle = '#ffffff'
        context.strokeRect(10, 10, 80, 80);
        context.restore();  // Restore the context once the clipped image has been drawn.
    }

     ////////////////////////////// Clipping & Animating \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     var windmillRotation = 0;
     var drawWindmill = function() {
        windmillRotation += 0.1 % (Math.PI * 2);
        resetContext();
        context.translate(720, 110);     // Center of the windmill clipping area and the picture 
        context.clearRect(-img2.width * 0.5, -img2.height * 0.5, img2.width, img2.height);
        context.save();                 //Save context before clipping
        context.rotate(windmillRotation);
        context.rect(img2.width * -0.5, -10, img2.width, 20);
        context.rect(-10, img2.height * -0.5, 20, img2.height); // Windmill pattern
        context.clip();
        context.rotate(-windmillRotation);
        context.drawImage(img2, -img2.width * 0.5, -img2.height * 0.5);
        context.restore();  // Restore the context once the clipped image has been drawn.
     };

    ////////////////////////////// Image Loading \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    // First Image Of Dog - Also calls drawRotatedScaledImage and drawTextAndImage when done as it needs to be rendered only once.
    var img1 = new Image();
    var img1IsLoaded = false;
    img1.onload = function() {
        img1IsLoaded = true;
        drawRotatedScaledImage(); // No animation or clipping, only needs to happen once.
        drawTextAndImage();
    }
    img1.src = "media/thisdog_small.png"

    // Second Image Of Dog - Used for clipping and things requiring updates.
    var img2 = new Image();
    var img2IsLoaded = false;
    img2.onload = function() {
        img2IsLoaded = true;
        animate();
    }
    img2.src = 'media/thisdogagain_small.png'; 

    ////////////////////////////// Update Calls \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    //The draw() function is called every 25 milliseconds
    /* var frame = setInterval(function() {
        drawLine();
        drawClippedCircle();
        drawClippedRectangle();
        drawWindmill();
    }, 25); */

    // More efficient way to animate
    function animate() {
        reqAnimFrame = window.mozRequestAnimationFrame    ||
                       window.requestAnimationFrame ||
                       window.msRequestAnimationFrame     ||
                       window.oRequestAnimationFrame
                       ;
    
        reqAnimFrame(animate);
        
        if(!img2IsLoaded)
            return;

        drawLine();
        drawClippedCircle();
        drawClippedRectangle();
        drawWindmill();
    }
});