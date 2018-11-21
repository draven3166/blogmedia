//Reescribir el layout del home
(function(){
  var front = $('.front');

  // content y sidebar a 50-50
  front.find('#content').removeClass('web-70').addClass('ed-item web-50');
  front.find('#sidebar_second').removeClass('web-30').addClass('ed-item web-50 no-padding');

  // la region interna del sidebar será un ed-container
  front.find('.region-sidebar-second').addClass('ed-container');

  // Publica en emudy
  front.find('#block-block-3').addClass('ed-item web-45');

  // Publica en emudy (usuario registrado)
  front.find('#block-block-12').addClass('ed-item web-45');

  // Adsense cuadrado
  front.find('#block-block-4').addClass('ed-item web-55');

  // Adsense vertical
  front.find('#block-block-5').addClass('ed-item web-30');

  // Posts recientes
  front.find('#block-views-posts-block-2').addClass('ed-item web-70');

  // Mover el menu vertical
  front.find('#block-block-8').prependTo('#block-block-5');

  // Ocultar titulo en home
  front.find('h1').hide();
})();


// Insertar boton siguenos entre los posts recientes del home
(function(){
  var siguenos = $('<a href="https://www.facebook.com/emudyisgenial" class="siguenos">Dale me gusta y recibe más posting <div class="fb-like" data-href="https://www.facebook.com/emudyisgenial" data-width="auto" data-layout="button_count" data-action="like" data-show-faces="true" data-share="false"></div></a>');
  var postsDestacados = $('#block-system-main').find('.view-posts').find('.views-row');
  postsDestacados.eq(2).after(siguenos);
})();

