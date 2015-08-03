var CustomEvent = require('custom-event');

// @TODO - use a module for this
function insertCss(className, animationName) {
    var css =
        '@-webkit-keyframes ' + animationName + ' { from { clip: rect(1px, auto, auto, auto); } to { clip: rect(0px, auto, auto, auto); } }' +
        '@keyframes ' + animationName + ' { from { clip: rect(1px, auto, auto, auto); } to { clip: rect(0px, auto, auto, to); } }' +
        ' .' + className + ' {' +
        '   -webkit-animation-duration: 0.001s; animation-duration: 0.001s;' +
        '   -webkit-animation-name: ' + animationName + '; animation-name: ' + animationName + ';' +
        '}';

    var el = document.createElement('style');
    var text = document.createTextNode(css);
    el.appendChild(text);

    if (document.head.childNodes.length) {
        document.head.insertBefore(el, document.head.childNodes[0]);
    } else {
        document.head.appendChild(el);
    }
}

function listen(className) {

    className = className || 'inserted';
    var animationName = className + 'Inserted';

    insertCss(className, animationName);

    insertListener = function(ev) {
        var evTarget = ev.target;
        var newEvent;
        if (ev.animationName === animationName) {

            newEvent = new CustomEvent('inserted', {
                bubbles: false,
                cancelable: true,
                detail: {
                    insertedElement: evTarget,
                    animationName: animationName
                }
            });

            if (evTarget.parentNode) {
                evTarget.parentNode.dispatchEvent(newEvent);
            }
            document.dispatchEvent(newEvent);
        }
    };

    document.addEventListener("animationstart", insertListener, false);
    document.addEventListener("MSAnimationStart", insertListener, false);
    document.addEventListener("webkitAnimationStart", insertListener, false);

}

/** module api */
module.exports = {
    listen: listen
};
