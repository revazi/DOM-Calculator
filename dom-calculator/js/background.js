var toggle = false;


var calcManager = function(toggle, tab) {
  if(toggle) {
    chrome.browserAction.setIcon({path: "/img/on-calc.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {file: "/js/jquery.min.js"});
    chrome.tabs.executeScript(tab.id, {file: "/js/jquery.cookie.js"});
    chrome.tabs.executeScript(tab.id, {file: "/js/jquery.highlighter.min.js"});
    chrome.tabs.executeScript(tab.id, {file: "/js/content-calculator.js"});
  } else {
    chrome.browserAction.setIcon({path: "/img/off-calc.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code: "typeof calculator !== 'undefined' ? calculator.off() : console.log('calculator is not on');"});
  }
};


chrome.browserAction.onClicked.addListener(function(tab){
  toggle = !toggle;
  calcManager(toggle, tab);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  calcManager(toggle, tab);
});


