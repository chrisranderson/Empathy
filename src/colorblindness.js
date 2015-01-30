define(['../lib/colorvision', '../lib/html2canvas', '../src/helpers'], function () {

    var output = element('div');
    output.classList.add('item');
    output.innerHTML = '' +
    '<label>Colorblindness</label>' +
    '<select name="blindnessType" id="blindnessType">' +
    '    <option value="normal">Normal</option>' +
    '    <option value="achromatope">Achromatope</option>' +
    '    <option value="protanope">Protanope</option>' +
    '    <option value="deuteranope">Deuteranope</option>' +
    '    <option value="tritanope">Tritanope</option>' +
    '</select>';
    output.addEventListener('change', blindnessChanged);
    return output;

    function blindnessChanged(event) {
        var type = event.target.selectedOptions[0].value;
        var newImage;
        getImageFromHtml(function (canvas) {
            newImage = element('img');
            newImage.setAttribute('src', canvas.toDataURL());
            newImage = Color.Vision.Simulate(newImage, {
                type: type, callback: function (canvas) {
                    newImage.setAttribute('src', canvas.toDataURL());
                    newImage.classList.add('colorAlteration');
                    newImage.style.position = 'fixed';
                    newImage.style.top = '-8px';
                    newImage.style.left = '0px';
                    newImage.style.zIndex = '-1';
                    qs('.siteContainer').style.opacity = '0';
                    var oldImage = qs('.colorAlteration');
                    if (oldImage) qs('body').removeChild(oldImage);
                    qs('body').appendChild(newImage);
                }
            });
        });
    }

    function getImageFromHtml(callback) {
        html2canvas().then(function (data) {
            callback(data);
        });
    }

});


