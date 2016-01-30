// Downloads high resolution images from google image search page
var api = (function() {
  return {
    imageQueryParam: 'imgurl',
    defaultDownloadCount: 5,
    urls: {},

    /**
     * Pick a parameter from a url
     */
    getParameterByName: function(url, name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    /**
     * Gets all the anchor tags on a page
     * @return {[type]} [description]
     */
    getAllAnchorTags: function() {
      return document.getElementsByTagName('a') || [];
    },

    /**
     * Returns an array of image urls from anchor tag collection
     */
    getAllImageURLs: function() {
      var index, anchor, url, urlArr = [],
        anchorCollection = this.getAllAnchorTags();

      for (index in anchorCollection) {
        anchor = anchorCollection[index];
        url = this.getParameterByName(anchor.href || '', this.imageQueryParam);
        if (url) {
          urlArr.push(url);
        }
      }

      return urlArr;
    },

    /**
     * Checks if the page has downloadable images
     */
    containsDownloadableImages: function() {
      var index, anchor, url, checkFlag,
        anchorCollection = this.getAllAnchorTags();

      for (index in anchorCollection) {
        anchor = anchorCollection[index];
        url = this.getParameterByName(anchor.href || '', this.imageQueryParam);
        if (url) {
          checkFlag = true;
          break;
        }
      }

      return !!checkFlag;
    },

    /**
     * Downloads image via its href
     */
    downloadImage: function(href) {
      var link = document.createElement('a');
      link.href = href;
      link.download = 'Download.jpg';
      document.body.appendChild(link);
      link.click();
    },

    /**
     * Get all images and download it one by one
     */
    getImages: function(count) {

      count = count || this.defaultDownloadCount;

      var index, image, allImages = this.getAllImageURLs();
      for (index in allImages) {
        image = allImages[index];
        if (index < count) {
          this.downloadImage(image);
        } else {
          break;
        }

      }
    }

  };
})();
