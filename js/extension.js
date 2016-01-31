/**
 * Script gets executed after DOM content is completely loaded
 */
document.addEventListener('DOMContentLoaded', function() {

  var urlCollection = [];

  /**
   * Sends message to content script
   */
  function sendMessageToCS(msgObj, cb) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      if (cb) {
        chrome.tabs.sendMessage(tabs[0].id, msgObj, cb);
      } else {
        chrome.tabs.sendMessage(tabs[0].id, msgObj);
      }
    });
  }

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
    sendMessageToCS({
      key: 'downloadImages'
    });
  }

  /**
   * Creates an image and binds events
   */
  function createImage(imgObj) {
    var image = new Image();
    var div;

    image.onload = function() {
      // Create an outer div
      div = document.createElement('div');
      div.className = 'thumbnail';

      // Append image to the div
      div.appendChild(image);

      // Append the element to imglist el
      document.getElementById('imglist').appendChild(div);
    };
    image.onerror = function() {
      console.log('Error in loading ' + imgObj.thumbnail);
    };
    image.onclick = function() {
      switch (image.parentElement.className) {
        case 'thumbnail':
          image.parentElement.className = 'thumbnail selected';
          break;
        case 'thumbnail selected':
          image.parentElement.className = 'thumbnail';
          break;
      }
    };
    image.src = imgObj.thumbnail;
  }

  /**
   * Renders thumbnail on the extension html
   */
  function renderThumbnails() {
    var image, imgText = '';
    for (var index in urlCollection) {
      image = urlCollection[index];
      createImage(image);
    }
  }

  /**
   * On popup open
   */
  function init() {
    sendMessageToCS({
      key: 'onExtensionOpen'
    }, function(imageArr) {
      urlCollection = imageArr;
      renderThumbnails();
    });
  }

  init();

  /****************************** EVENTS *****************************/
  document.getElementById('btnYes').addEventListener('click', function() {
    downloadImages();
  });
  document.getElementById('btnNo').addEventListener('click', function() {
    closePopup();
  });

});
