(function() {
  'use strict';

  var tabID = 0;

  // Sets the tab id
  chrome.tabs.onUpdated.addListener(function(tabid) {
    tabID = tabid;
  });

  // Listeners from content script
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // If the page has downloadable icons then show the icon
      if (request.key == 'showIcon' && request.value) {
        chrome.pageAction.show(tabID);
      }
    });

})();
