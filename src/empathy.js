(function(){

    appendControls();


    bar.addEventListener('change', setColorSimulation);

    function appendControls() {
        var bar = element('div');
        bar.innerHTML = '' +
        '<label>Colorblindness</label>' +
        '<select name="blindnessType" id="blindnessType">' +
        '    <option value="normal">Normal</option>' +
        '    <option value="achromatope">Achromatope</option>' +
        '    <option value="protanope">Protanope</option>' +
        '    <option value="deuteranope">Deuteranope</option>' +
        '    <option value="tritanope">Tritanope</option>' +
        '</select>';

        bar.addEventListener('change', function (event) {
            debugger;
        })
    }

    function element (type) {
        return document.createElement(type)
    }
})();