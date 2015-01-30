define(function () {
    // Library/helper functions
    window.qs = function (selector) {
        return document.querySelector(selector);
    };

    window.qsa =  function (selector) {
        return document.querySelectorAll(selector);
    };

    window.element = function (type) {
        return document.createElement(type);
    };
});