function ColorBlindnessSimulator() {

    var self = newElement('div', 'item');
    self.innerHTML = '' +
    '<div class="row">' +
    '   <label>Colorblindness</label>' +
    '   <button class="hidden revert">Revert</button>' +
    '   <button class="slideComparison hidden">Compare to original</button>' +
    '</div>'+
    '<div class="simulationOptions">' +
    '    <button value="achromatope">Achromatope</button>' +
    '    <button value="protanope">Protanope</button>' +
    '    <br/>' +
    '    <button value="deuteranope">Deuteranope</button>' +
    '    <button value="tritanope">Tritanope</button>' +
    '</div>';

    self.querySelector('div.simulationOptions').addEventListener('click', blindnessTypeSelected);
    self.querySelector('button.slideComparison').addEventListener('click', startComparison);

    return self;

    // The initial event
    function blindnessTypeSelected(event) {
        preparePage();

        var type = event.target.getAttribute('value');
        var screenshot;
        chrome.runtime.sendMessage({name: 'screenshot'}, function screenshotComplete(dataUrl) {
            screenshot = newElement('img');
            screenshot.setAttribute('src', dataUrl);

            // TODO: feed color.vision the dataURL directly
            Color.Vision.Simulate(screenshot, {
                type: type, callback: renderingFinished
            });
        });
        //html2canvas().then(function (screenshotCanvas) {
        //    screenshot = newElement('img');
        //    screenshot.setAttribute('src', screenshotCanvas.toDataURL());
        //    // TODO: feed color.vision the canvas directly
        //    Color.Vision.Simulate(screenshot, {
        //        type: type, callback: renderingFinished
        //    });
        //});
    }

    // Called before
    function preparePage(){
        qs('.empathyBar').style.opacity = 0;

        var oldImage = qs('.colorSimulation');
        if (oldImage) qs('body').removeChild(oldImage);
        if (!qs('.siteContainer')) {
            addSiteContainer();
        }
        qs('.siteContainer').style.opacity = 1;
    }

    function renderingFinished(modifiedImageCanvas) {
        var newImage;
        qs('button.revert').classList.remove('hidden');
        qs('button.slideComparison').classList.remove('hidden');
        newImage = newElement('img', 'colorSimulation');
        newImage.setAttribute('src', modifiedImageCanvas.toDataURL());
        qs('body').appendChild(newImage);
        animations.fadeOut(qs('.siteContainer'));
        animations.fadeIn(qs('.empathyBar'));
    }

    function startComparison(){
        var body = qs('body');
        var coloredImage = qs('.colorSimulation');
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
    self.style.top = window.scrollY+'px';
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



