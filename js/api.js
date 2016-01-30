// Downloads high resolution images from google image search page
var api = (function() {
  return {
    imageQueryParam: 'imgurl',
    defaultDownloadCount: 5,
    urlCollection: [],

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
     * Returns the base64 image from an anchor tag
     */
    getBase64Image: function(anchor){
      return anchor.childNodes && anchor.childNodes[0].src;
    },

    /**
     * Returns an array of image urls from anchor tag collection
     */
    getAllImageURLs: function() {
      var index, anchor, url,
        anchorCollection = this.getAllAnchorTags();

      for (index in anchorCollection) {
        anchor = anchorCollection[index];
        url = this.getParameterByName(anchor.href || '', this.imageQueryParam);
        if (url) {
          this.urlCollection.push({
            url: url,
            base64: this.getBase64Image(anchor) || url
          });
        }
      }
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

      var index, imageObj;

      this.getAllImageURLs();

      for (index in this.urlCollection) {
        imageObj = this.urlCollection[index];
        if (index < count) {
          this.downloadImage(imageObj.url);
        } else {
          break;
        }

      }
    }

  };
})();
