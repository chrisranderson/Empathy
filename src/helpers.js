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

window.wrapInner = function (target, wrapper, options) {
    var children = [].slice.apply(target.children);
    children.forEach(function (child) {
        if (child.classList.contains(options.exception)) return;
        wrapper.appendChild(child);
    });
    target.appendChild(wrapper);
};

window.getDocumentHeight = function() {
    var body = document.body,
        html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight)+'px';
};

window.animations = {};

window.animations.linearGradient = function(target, options) {
    var slopePositive;
    var start = options.start;
    var end = options.end;
    var property = options.property;
    var duration = options.duration;

    slopePositive = end > start;
    if (typeof duration == 'undefined') {
        duration = 2000;
    }

    var animationStart = null;
    window.requestAnimationFrame(function requestFrame(currentTime) {
        if (animationStart == null) animationStart = currentTime;
        var progress = currentTime - animationStart;

        if (slopePositive) {
            target.style.setProperty(property, start + progress/duration);
        } else {
            target.style.setProperty(property, start - progress/duration);
        }

        if (progress < duration) {
            requestAnimationFrame(requestFrame);
        } else {
            target.style.setProperty(property, end);
        }
    });
};

window.animations.fadeIn = function (element, duration) {
    window.animations.linearGradient(element, {
        property: 'opacity',
        duration: duration,
        start: 0,
        end: 1
    });
};

window.animations.fadeOut = function(element, duration) {
    window.animations.linearGradient(element, {
        property: 'opacity',
        duration: duration,
        start: 1,
        end: 0
    });
};