document.addEventListener('DOMContentLoaded', function(e) {

    var forEach = Array.prototype.forEach;
    var video = document.getElementById("video");
    var audio = document.getElementById("audio");
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

    video.addEventListener("play", function() {
        audio.pause();
    });

    audio.addEventListener("play", function() {
        video.pause();
    });

    if(!Modernizr.canvas) {
        return;
    }

    ////////////////////////////// Screencap \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    var captureButton = document.getElementById("captureButton");
    var captureCanvas = document.getElementById("screenCapCanvas");
    var captureCanvasContext = captureCanvas.getContext('2d');
    
    captureCanvas.width = video.offsetWidth;
    captureCanvas.height = video.offsetHeight;
    
    captureButton.addEventListener("click", function() {
        captureCanvasContext.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
        var thumb = new Image();
        thumb.src = captureCanvas.toDataURL("image/png");
        screenCapsArea.appendChild(img);
    });
});