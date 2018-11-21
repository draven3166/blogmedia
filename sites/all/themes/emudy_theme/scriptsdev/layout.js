// Padding top al body respecto al header
(function(){
  var header = $('#js-header');
  var headerHeight = header.height();
  $('body.html').css('padding-top', headerHeight + 'px');
})();