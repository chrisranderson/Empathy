function EmpathyBar () {
    self = newElement('div', 'empathyBar');
    self.appendChild(new ColorBlindnessSimulator());

    self.load = function(){
        qs('body').appendChild(this);
    };

    return self;
}


var empathy = new EmpathyBar();
empathy.load();

// Global mouse handling
window.mouseIsDown = false;
window.dragElement = null;

document.addEventListener('mousedown', function() {
    if (event.target.isSlideHandle) {
        window.dragElement = event.target;
    }
});

document.addEventListener('mouseup', function () {
    window.dragElement = null;
});

// For the comparison handle... feels hacky...
document.addEventListener('mousemove', function(event) {
    if (window.dragElement) {
        window.dragElement.move(event);
    }
});
