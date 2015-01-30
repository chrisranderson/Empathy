(function(){

    appendControls();

    function appendControls() {
        var colorBlindness = getColorBlindnessHtml();
        var bar = element('div');
        bar.classList.add('empathyBar');
        bar.appendChild(colorBlindness);


        bar.addEventListener('change', blindnessChanged);
        $('body').appendChild(bar);
    }

    function blindnessChanged(event){
        var type = event.target.selectedOptions[0].value;
        var newImage;
        getImageFromHtml(function (canvas) {
            newImage = element('img');
            newImage.setAttribute('src',canvas.toDataURL());
            newImage = Color.Vision.Simulate(newImage, {type:type, callback: function (canvas) {
                newImage.setAttribute('src', canvas.toDataURL());
                $('body').appendChild(newImage);
            }});
        });
    }

    function getImageFromHtml(callback) {
        html2canvas().then(function (data) {
            callback(data)
        });
    }

    function getColorBlindnessHtml(){
        var output = element('div');
        output.classList.add('item');
        output.innerHTML = '' +
        '<div class="item">' +
        '<label>Colorblindness</label>' +
        '<select name="blindnessType" id="blindnessType">' +
        '    <option value="normal">Normal</option>' +
        '    <option value="Achromatope">Achromatope</option>' +
        '    <option value="Protanope">Protanope</option>' +
        '    <option value="Deuteranope">Deuteranope</option>' +
        '    <option value="Tritanope">Tritanope</option>' +
        '</select>' +
        '</div>';
        return output;
    }

    function $(selector){
        return document.querySelector(selector)
    }

    function element (type) {
        return document.createElement(type)
    }
})();