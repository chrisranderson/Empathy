chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.insertCSS(null, {
        file: "css/empathy.css"
    });
    chrome.tabs.executeScript(null, {
        file: "empathy.js"
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.name == 'screenshot') {
        chrome.tabs.captureVisibleTab(null, null, function(dataUrl) {
            sendResponse(dataUrl);
            return true;
        });
    }
    return true;
});