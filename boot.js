chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        file: "empathy.js"
    });
    chrome.tabs.insertCSS(null, {
        file: "css/empathy.css"
    });
});