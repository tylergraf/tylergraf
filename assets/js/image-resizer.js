$(document).ready(function() {
  function resizeImages() { 
    var imgs = $('.photoset-image');
    imgs.each(function(index,image){
      var width = $(image).width();
      $(image).height(width*(2/3));
    });
  }

  function resizeIframe(_this){
    var postWidth = $('.post').width()-40;
    var currentWidth = _this.width();
    var currentHeight = _this.height();

    _this.width(postWidth);
    _this.height(postWidth*(currentHeight/currentWidth));

  }

  resizeImages();
  resizeIframe($('iframe'));
  resizeIframe($('embed'));

  $(window).resize(function(){
    resizeImages();

    resizeIframe($('iframe'));
    resizeIframe($('embed'));
  });
    
  $('.page-header h1').addClass('on');
});