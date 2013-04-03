$(document).ready(function() {
  function resizeImages(_this) { 
    var imageWidth = _this.width();
    _this.height(imageWidth*(2/3))
  }


  function resizeComments(_this){
    var iframeWidth = _this.width();
    _this.find('iframe').width(iframeWidth);
  }

  resizeImages($('.photoset-image-wrapper'));

  setTimeout(function(){
    resizeComments($('.fb-comments'));
  },500);


  $(window).resize(function(){
    resizeImages($('.photoset-image-wrapper'));
  });
    
  $('.page-header h1').addClass('on');
});