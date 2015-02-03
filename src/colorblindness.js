function ColorBlindnessSimulator() {

    var self = newElement('div', 'item');
    self.innerHTML = '' +
    '<label>Colorblindness</label>' +
    '<select name="blindnessType" id="blindnessType">' +
    '    <option value="normal">Normal</option>' +
    '    <option value="achromatope">Achromatope</option>' +
    '    <option value="protanope">Protanope</option>' +
    '    <option value="deuteranope">Deuteranope</option>' +
    '    <option value="tritanope">Tritanope</option>' +
    '</select>' +
    '<button class="slideComparison">Compare to original</button>';

    self.querySelector('select').addEventListener('change', blindnessTypeSelected);
    self.querySelector('button.slideComparison').addEventListener('click', startComparison);

    return self;

    // The initial event
    function blindnessTypeSelected(event) {
        preparePage();

        var type = event.target.selectedOptions[0].value;
        var screenshot;
        chrome.runtime.sendMessage({name: 'screenshot'}, function (dataUrl) {
                screenshot = newElement('img');
                screenshot.setAttribute('src', dataUrl);

                // TODO: feed color.vision the dataURL directly
                Color.Vision.Simulate(screenshot, {
                    type: type, callback: appendNewImage
                });
        });
        //html2canvas().then(function (screenshotCanvas) {
        //    screenshot = newElement('img');
        //    screenshot.setAttribute('src', screenshotCanvas.toDataURL());
        //
        //    // TODO: feed color.vision the canvas directly
        //    Color.Vision.Simulate(screenshot, {
        //        type: type, callback: appendNewImage
        //    });
        //});
    }

    // Called when the new colored image is finished rendering
    function appendNewImage(modifiedImageCanvas) {
        var newImage;

        newImage = newElement('img', 'colorAlteration');

        newImage.setAttribute('src', modifiedImageCanvas.toDataURL());
        qs('body').appendChild(newImage);
        fadeInImage();
        qs('.empathyBar').style.display = 'block';
    }

    // Fades in the new image
    function fadeInImage(){
        var container = qs('.siteContainer');
        var animationStart = null;
        var timeLimit = 2000; // ms
        window.requestAnimationFrame(function requestFrame(timestamp) {
            if (animationStart == null) animationStart = timestamp;
            var progress = timestamp - animationStart;
            container.style.opacity = (1 -progress/timeLimit);
            progress = timestamp - animationStart;
            if (progress < timeLimit) {
                requestAnimationFrame(requestFrame);
            } else {
                container.style.opacity = 0;
            }
        })
    }

    // Called before
    function preparePage(){
        var oldImage = qs('.colorAlteration');
        if (oldImage) qs('body').removeChild(oldImage);
        if (!qs('.siteContainer')) {
            addSiteContainer();
        }
        qs('.siteContainer').style.opacity = 1;
        qs('.empathyBar').style.display = 'none';
    }

    function startComparison(){
        var body = qs('body');
        var coloredImage = qs('.colorAlteration');
        coloredImage.style.maxWidth = 'inherit';
        coloredImage.style.position = 'inherit';
        coloredImage.style.zIndex = 'inherit';
        qs('.siteContainer').style.opacity = 'initial';
        var slideWindow = new SlideWindow();
        body.removeChild(coloredImage);
        slideWindow.appendChild(coloredImage);
        body.appendChild(slideWindow);
    }

    function addSiteContainer(){
        var body = qs('body');
        var children = [].slice.apply(body.children);
        var siteContainer = newElement('div', 'siteContainer');
        children.forEach(function (child) {
            if (child.classList.contains('empathyBar')) return;
            siteContainer.appendChild(child);
        });
        body.appendChild(siteContainer);
    }

}

function SlideWindow () {
    var self = newElement('div', 'slideWindow');
    self.style.height = documentHeight();
    var slideHandle = new SlideHandle();
    self.appendChild(slideHandle);
    return self;
}

function SlideHandle () {
    var self = newElement('div', 'slideHandle');
    self.isSlideHandle = true;
    self.textContent = '⬄';
    self.move = function move(event) {
        event.preventDefault();
        this.parentElement.style.width = event.clientX + 'px';
    };
    return self;
}

function documentHeight() {
    var body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight)+'px';
}



