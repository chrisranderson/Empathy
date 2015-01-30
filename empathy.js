require(['src/colorblindness', 'src/helpers'], function(cbhtml) {
    console.log('made it!');
    appendControls();

    function appendControls() {
        var bar = element('div');
        bar.classList.add('empathyBar');
        bar.appendChild(cbhtml);
        qs('body').appendChild(bar);
    }
});