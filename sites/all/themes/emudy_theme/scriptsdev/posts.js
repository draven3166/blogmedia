// Mover la metadata de los posts en tamaños pequeños
(function(){
  if($(window).width() < 500) {
    $('.view-posts').find('.post--main .post__data').each(function(i,el){
      var parent = $(el).parent().parent();
      $(el).appendTo(parent).addClass('append');
    });
  }
})();

// añadir link a las imágenes de los posts en las vistas
(function(){
  var viewPosts = $('.view-posts').find('.post');
  viewPosts.each(function(i,el){
    var img = $(el).find('img');
    var href = $(el).find('a').attr('href');
    img.wrap('<a href="' + href + '" />' );
  });
})();

// Mover links debajo del titulo
(function(){
  $('.links.inline').insertAfter($('.field-name-field-subtitulo'));
})();

// Cambiar texto lecturas por vistas en los posts
(function(){
  var vistas = $('.page-node').find('.statistics_counter span');
  var textoNuevo = vistas.text().replace("lecturas","vistas") || vistas.text().replace("lectura","vista");
  vistas.text(textoNuevo);
})();


// Usar el texto alt como leyenda de las imagenes

$('.field-name-body').find('img').each(function(i,el){
  var title = $(el).attr('alt');
  $(el).wrap('<figure class="figure" />');
  $(el).parent().append('<figcaption>' + title + '</figcaption>')
});