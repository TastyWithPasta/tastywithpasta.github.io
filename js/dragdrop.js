document.addEventListener('DOMContentLoaded', function(e) {
    var sourceContainerId = null;
    var cancel = function(e) {
        if (e.preventDefault) e.preventDefault(); // If preventDefault exists, call it
        if (e.stopPropagation) e.stopPropagation(); // Prevents the event from bubbling up the DOM tree.
        return false; 
    };

    var dropped = function(e) {
        cancel(e);

        var id;
        if(this.id == sourceContainerId)
            return;

        this.classList.remove("dragOver");

        try{
            id = dataTransfer.getData('text/plain', e.target.id); // Get data from the drag (see dragStart)
        } catch(ex) {
            console.log("Exception dropping into: " + this.id);
            id = dataTransfer.getData('Text', e.target.id); // If it's ie, do it another way.
        }
        e.target.appendChild(document.getElementById('#'+id));

        console.log("Gary has been dropped on: " + this.id);
    };

    var dragEnter = function(e) {
        cancel(e);
    };

    var dragOver = function(e) {
        cancel(e);

        var checkedRadioElement = document.querySelector("#effectAllowedRadios input:checked")
        e.dataTransfer.dropEffect = checkedRadioElement.value;
        this.classList.remove("dragOver");
    };

    var dragLeave = function(e) {
        cancel(e);
    };

    var dragStart = function(e) {
        // text/plain not supported by IE

        var checkedRadioElement = document.querySelector("#effectAllowedRadios input:checked")
        e.dataTransfer.effectAllowed = checkedRadioElement.value;

        try{
            e.dataTransfer.setData('text/plain', e.target.id); // Set the data transfer element to the target's id, stored in plain text
        } catch(ex) {
            e.dataTransfer.setData('Text', e.target.id); // If it's ie, do it another way.
        }
        sourceContainerId = this.parentElement.id;
        console.log("Gary is being dragged dragged. Dragged element: " + e.target.id+ ". This: " + this.id);
    };

    var dragEnd = function(e) {
        var effectMessage = document.getElementById('dragEffectMsg');
        effectMessage.innerText= "Effect applied: " + e.dataTransfer.dropEffect;

        if(effectMessage.classList.contains("hide")) {
            effectMessage.classList.remove("hide");
        }

        console.log("Gary is no longer being dragged.");
    };

    // For managing all drag & drop sources at once
    var sources = document.querySelectorAll("[draggable=true]");
    [].forEach.call(sources, function(source) {
        source.addEventListener('dragstart', dragStart, false);
        source.addEventListener('dragend', dragEnd, false);
    });

    // For managing all drag & drop targets at once
    var targets = document.querySelectorAll("[data-role=drag-drop-target]");
    [].forEach.call(targets, function(target){
        target.addEventListener('dragenter', dragEnter, false); 
        target.addEventListener('dragover', dragOver, false);
        target.addEventListener('dragleave', dragLeave, false);
        target.addEventListener('drop', dropped, false);
    });

});