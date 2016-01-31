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
   * Renders thumbnail on the extension html
   */
  function renderThumbnails(){
    var image, imgText = '';
    for(var index in urlCollection){
      image = urlCollection[index];
      imgText += '<div class="thumbnail"><img src="'+image.thumbnail+'"></img></div>';
    }
    document.getElementById('imglist').innerHTML = imgText;
  }

  /**
   * On popup open
   */
  function init() {
    sendMessageToCS({
      key: 'onExtensionOpen'
    }, function(imageArr){
      urlCollection = imageArr;
      renderThumbnails();


      document.getElementsByTagName('img').onerror = function () {
        this.style.display = "none";
      };

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
