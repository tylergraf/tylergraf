$(document).ready(function() {

  function resizeIframe(_this){
    var iframeWidth = _this.width();
    _this.find('iframe').width(iframeWidth);
    _this.find('iframe').height(iframeWidth*(.5625));

  }
  function resizeComments(_this){
    var iframeWidth = _this.width();
    _this.find('iframe').width(iframeWidth);
  }

  resizeIframe($('.film-iframe'));
  setTimeout(function(){
    resizeComments($('.fb-comments'));
  },500);

  $(window).resize(function(){
    resizeIframe($('.film-iframe'));
    resizeComments($('.fb-comments'));
  });
    
  $('.page-header h1').addClass('on');
});