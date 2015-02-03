chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.insertCSS(null, {
        file: "css/empathy.css"
    });
    chrome.tabs.executeScript(null, {
        file: "empathy.js"
    });
});