// Listners
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Download Images
    if (request.key === 'downloadImages') {
      api.getImages();
    }
  });

/**
 * Checks if icon needs to shown on the page
 */
function showIcon() {
  chrome.runtime.sendMessage({
    key: 'showIcon',
    value: api.containsDownloadableImages()
  });
}

showIcon();
