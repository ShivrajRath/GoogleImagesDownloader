// Listners
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.key) {
      // Downloads images
      case 'downloadImages':
        api.getImages();
        break;
      // Downloads selected images
      case 'downloadSelectedImages':
        api.getSelectedImages(request.value);
        break;
      // When extension opens
      case 'onExtensionOpen':
        sendResponse(api.getAllImageURLs());
        break;
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
