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

  function resizeComments(_this){
    var iframeWidth = _this.width();
    _this.find('iframe').width(iframeWidth);
  }


  resizeImages();
  resizeIframe($('iframe'));
  resizeIframe($('embed'));

  setTimeout(function(){
    resizeComments($('.fb-comments'));
  },500);


  $(window).resize(function(){
    resizeImages();
    resizeComments($('.fb-comments'));

    resizeIframe($('iframe'));
    resizeIframe($('embed'));
  });
    
  $('.page-header h1').addClass('on');
});