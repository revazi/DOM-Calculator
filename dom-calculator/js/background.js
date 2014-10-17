  var toggle = false;
  chrome.browserAction.onClicked.addListener(function(tab){
    toggle = !toggle;
    if(toggle) {
      chrome.browserAction.setIcon({path: "/img/on-calc.png", tabId:tab.id});
      chrome.tabs.executeScript(tab.id, {file: "/js/content-calculator.js"});
      //chrome.tabs.executeScript(tab.id, {code: "calculator ? calculator.init() : console.log('calculator object doesn\'t exists')"});
    } else {
      chrome.browserAction.setIcon({path: "/img/off-calc.png", tabId:tab.id});
      chrome.tabs.executeScript(tab.id, {code: "calculator ? calculator.off() : console.log('calculator is not on');"});
    }
  });

