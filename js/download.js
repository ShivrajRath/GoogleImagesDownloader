document.addEventListener('DOMContentLoaded', function() {
  /**
   * Closes the popup
   */
  function closePopup() {
    window.close();
  }

  /**
   * Instructs the content script to download images
   */
  function downloadImages() {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        key: 'downloadImages'
      });
    });
  }

  /****************************** EVENTS *****************************/
  document.getElementById('btnYes').addEventListener('click', function() {
    downloadImages();
  });
  document.getElementById('btnNo').addEventListener('click', function() {
    closePopup();
  });

});
