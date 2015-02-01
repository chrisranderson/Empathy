require(['src/colorblindness', 'src/helpers'], function(cbhtml) {
    appendControls();

    function appendControls() {
        var bar = newElement('div');
        bar.classList.add('empathyBar');
        bar.appendChild(cbhtml);
        qs('body').appendChild(bar);
    }

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
    })
});