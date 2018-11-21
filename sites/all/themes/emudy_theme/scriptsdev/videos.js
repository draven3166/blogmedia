// Añadir link al nodo en la miniatura de los videos
(function(){
  $('.view-videos').find('.views-row').each(function(i,el){
    var link = $(el).find('.views-field-title a').attr('href');
    $(el).find('.views-field-field-video').wrap('<a href="' + link + '" />');
  });
})();

// Limpiar googtube
(function(){
  var googtubeVideo = document.querySelector('.field-name-body object');
  if(googtubeVideo){
    googtubeVideo.previousSibling.remove();
  }
})();