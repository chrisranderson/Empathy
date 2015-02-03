// Library/helper functions
window.qs = function (selector) {
    return document.querySelector(selector);
};

window.qsa =  function (selector) {
    return document.querySelectorAll(selector);
};

window.newElement = function (type, newClass, styles) {
    var output = document.createElement(type);
    if (typeof newClass != 'undefined') output.classList.add(newClass);
    if (typeof styles != 'undefined') window.setStyles(output, styles);
    return output;
};

window.setStyles = function (element, styles) {
    for (var property in styles) {
        if (styles.hasOwnProperty(property)) {
            element.style.setProperty(property, styles[property]+' !important');
        }
    }
};
