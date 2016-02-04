(function() {
  'use strict';
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

    function downloadSelectedImages() {
      sendMessageToCS({
        key: 'downloadSelectedImages',
        value: urlCollection
      });
    }

    /**
     * Creates an image and binds events
     */
    function createImage(imgObj) {
      var image = new Image();
      var div, span;

      image.onload = function() {
        // Create an outer div
        div = document.createElement('div');
        div.className = 'thumbnail';
        span = document.createElement('span');

        // Append image to the div
        div.appendChild(image);
        div.appendChild(span);

        // Append the element to imglist el
        document.getElementById('imglist').appendChild(div);
      };
      image.onerror = function() {
        console.log('Error in loading ' + imgObj.thumbnail);
      };
      image.onclick = function() {
        switch (image.className) {
          case 'selected':
            image.setAttribute('class', '');
            break;
          case '':
            image.setAttribute('class', 'selected');
            break;
        }
        imgObj.selected = !imgObj.selected;
      };
      image.addEventListener('load', function() {
        if (imgObj.resolution) {
          span.innerHTML = imgObj.resolution;
        }
      });
      image.src = imgObj.thumbnail;
    }

    /**
     * Renders thumbnail on the extension html
     */
    function renderThumbnails() {
      var image;
      for (var index in urlCollection) {
        image = urlCollection[index];
        createImage(image);
      }
    }

    /**
     * On popup open
     */
    function init() {
      urlCollection = [];
      sendMessageToCS({
        key: 'onExtensionOpen'
      }, function(imageArr) {
        urlCollection = imageArr;
        renderThumbnails();
      });
    }

    init();

    /****************************** EVENTS *****************************/
    // document.getElementById('btnDownAll').addEventListener('click', function() {
    //   downloadImages();
    // });

    document.getElementById('btnDownSelected').addEventListener('click', function() {
      downloadSelectedImages();
    });

    document.getElementById('btnClose').addEventListener('click', function() {
      closePopup();
    });

  });

})();
