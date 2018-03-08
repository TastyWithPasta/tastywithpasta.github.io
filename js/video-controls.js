document.addEventListener('DOMContentLoaded', function(e) {

    var forEach = Array.prototype.forEach;
    var video = document.getElementById("video");
    var stopButton = document.getElementById("stopButton");
    var muteButton = document.getElementById("muteButton");
    var firstFileName = video.getAttribute("data-firstfile");
    var secondFileName = video.getAttribute("data-secondfile");
    var previousVolume = 0;
    
    video.addEventListener("ended", function() {
        // Get all the possible sources
        sources = this.getElementsByTagName('source');

        // If the second file name is not found in the sources, replace it!
        if(sources[0].src.indexOf(secondFileName) === -1) {
            forEach.call(sources, function(source){
                source.src = source.src.replace(firstFileName, secondFileName);
            });
        }
        this.load();
        this.play();
    });

    stopButton.addEventListener("click", function() {
        video.pause();
        video.currentTime = 0;
    });

    muteButton.addEventListener("click", function() {
        if(video.muted) {
            video.volume = previousVolume;
            muteButton.innerText = "Mute";  
        }
        else {
            previousVolume = video.volume;
            muteButton.innerText = "Unmute";
        }
        video.muted = !video.muted;
    });

    if(!Modernizr.canvas) {
        return;
    }
    var captureCanvas = document.getElementById("screenCapCanvas");
    var captureCanvasContext = captureCanvas.getContext('2d');
    var captureButton = document.getElementById("captureButton");
    
    captureButton.addEventListener("click", function() {
        captureCanvasContext.drawImage(video, 0, 0);
        var captureIcon = captureCanvas.toDataURL("image/png");
        var img = new Image();
        img.onload = function() {
            var screenCapsArea = document.getElementById("screenCapsArea");
            screenCapsArea.appendChild(img);
        };
        img.src = captureIcon;
    });
});