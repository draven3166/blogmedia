var $ = jQuery;
$(function(){


// Padding top al body respecto al header
(function(){
  var header = $('#js-header');
  var headerHeight = header.height();
  $('body.html').css('padding-top', headerHeight + 'px');
})();
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
// Abrir la ventana modal de login
(function(){
  var loginBlock = $('#block-user-login');
  var login = $('#login');
  login.add($('#block-block-3')).on('click',function(e){
    e.preventDefault();
    loginBlock.addClass('show');
  });

  // Abrir el modal de login con el fake flag
  $('.not-logged-in .links').on('click',function(){
    login.trigger('click');
  });

  // Añadir botón de cerrar
  loginBlock.find('form').append('<a id="cerrar" class="icon-cerrar"></a>');
  $('#cerrar').on('click',function(){
    loginBlock.removeClass('show');
  });

  // Añadir botón de facebook al login
  loginBlock.find('.form-actions').before('<a href="/emudy/user/simple-fb-connect"' +
    ' class="facebook-login">Iniciar con Facebook <span class="icon-facebook"></span></a>')
})();
// Organizar perfil de usuario
(function(){
  var redes = $('.group-redes');
  redes.find('a').text('');
  redes.find('dl').appendTo('.user-picture');
  redes.insertAfter('#page-title');

  $('.page-user #page-title').add('.group-redes').wrapAll('<header class="autor-header" />');
  $('.page-user-edit #page-title').insertBefore('#user-profile-form');
  $('.page-user-edit .tabs').insertAfter('#page-title');

  // Meter el emudy-staff dentro del autor header
  var autorHeader = $('.autor-header');
  $('#emudy-staff').appendTo(autorHeader.find('h1'));
  $(autorHeader).prependTo($('.field-name-field-bio'));
})();

// Poner los tabs en la posicion correcta en la página de actividad del usuario
(function(){
  var body = $('body');
  if(body.hasClass('page-user') && !body.hasClass('page-user-track')) {
    $('.tabs').insertAfter('#block-system-main');
  }
})();

// Cambiar texto del tab Seguimiento por Actividad del perfil de usuarios
(function(){
  $('.tabs').find('a').each(function(i,el){
    if($(el).text().indexOf('Seguimiento') !== -1){
      $(el).text('Actividad');
    }
  });
})();

// Solo iconos en el bloque de autor de post
(function(){
  $('.autor__redes').children().each(function(i,el){
    var link = $(el).find('a').attr('href');
    $(el).find('a').hide();
    $(el).wrap('<a href="' + link + '" target="_blank" />');
  });
})();

// Añadir insignia al emudy staff en bloque de autor
(function(){
  var block = document.querySelector('#block-views-personas-block');
  var roles;
  if(block){
    roles = block.querySelector('.views-field-rid span').textContent;
    if(roles.indexOf('Staff') >= 0){
      block.classList.add('staff');
    }
  }
})();
// scripts para páginas administrativas

// Mover add pagina al final cuando se es admin
(function(){
  var tipos = $('.node-type-list').find('dt');
  if(tipos.length === 5){
    tipos.eq(1).insertAfter(tipos.eq(4));
  }
})();

// Cambiar título a "Comparte algo" cuando se va a publicar
(function(){
  var loc = document.location.href;
  if(loc.indexOf("node/add") != -1 && loc.indexOf("node/add/") == -1) {
    $('h1').text('Comparte algo:');
  }
})();

// Añadir instrucciones a CKEDitor
(function(){
  $('.form-type-textarea label').after('<ul class="instrucciones">'+
      '<li>Para insertar videos de YouTube pegue la URL dentro del área de texto</li>'+
      '<li>Para añadir titulos y propiedades a las imágenes haga clic derecho sobre ellas</li>' +
    '</ul>');
})();
// Votacion
(function(){
  var star1 = $('.star-1');
  var star2 = $('.star-2');
  var star3 = $('.star-3');
  star1.children('span').attr('title','No me gustó');
  star1.children('a').attr('title','No me gustó');
  star2.children('span').attr('title','Me gustó');
  star2.children('a').attr('title','Me gustó');
  star3.children('span').attr('title','Amo este post');
  star3.children('a').attr('title','Amo este post');
})();
// Menu principal en movil
(function(){
  var menu = $('#block-system-main-menu').find('.menu');
  var menuToggle = $('<div id="toggle-menu" class="icon-menu espacio hasta-tablet">Menú</div>');
  menu.before(menuToggle);
  menuToggle.on('click',function(){
    menu.slideToggle();
  });
})();

// Mostrar y ocultar el menu de usuario
(function(){
  var userMenu = $('#block-system-user-menu');
  var userBlock = $('#block-views-usuario-actual-block');
  var userBlockRegion = userBlock.parent().parent();

  userBlock.on('mouseenter',function(){
    userMenu.show();
  }).on('mouseleave', function(){
    userMenu.hide();
  });

  userMenu.on('mouseenter',function(){
    userBlock.trigger('mouseenter');
  }).on('mouseleave',function(){
    userBlock.trigger('mouseleave');
  });
})();
// Añadir iconos a las redes sociales
(function(){
  $('.field-name-field-facebook').find('a').addClass('icon-facebook espacio');
  $('.field-name-field-twitter').find('a').addClass('icon-twitter espacio');
  $('.field-name-field-instagram').find('a').addClass('icon-instagram espacio');
  $('.field-name-field-youtube').find('a').addClass('icon-youtube espacio');
  $('.field-name-field-linkedin').find('a').addClass('icon-linkedin espacio');
  $('.field-name-field-pinterest').find('a').addClass('icon-pinterest espacio');
})();
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
// Añadir placeholder al bloque de búsqueda
$('#block-search-form').find('[type="text"]').attr('placeholder','Buscar' +
  ' en Emudy');

// comentarios al final de los post relacionados
$('.fb-comments').appendTo('#content');

// Texto de botones para publicar
(function(){
  var publishButton = document.querySelector('.page-node-add #edit-submit');
  if(publishButton && location.href.indexOf('node/add') >= 0){
    publishButton.value = "Publicar";
  }
})();

// Insertar el adsense dentro del listado de posts del sidebar
$('#block-block-4').insertAfter($('#block-views-posts-block-4').find('.views-row').eq(3));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wZW4uanMiLCJsYXlvdXQuanMiLCJob21lLmpzIiwicG9zdHMuanMiLCJsb2dpbi5qcyIsInVzZXJzLmpzIiwiYWRtaW4uanMiLCJ2b3RhY2lvbi5qcyIsIm1lbnVzLmpzIiwic29jaWFsZXMuanMiLCJ2aWRlb3MuanMiLCJtb2R1bGVzLmpzIiwiY2xvc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJCA9IGpRdWVyeTtcclxuJChmdW5jdGlvbigpe1xyXG5cclxuIiwiLy8gUGFkZGluZyB0b3AgYWwgYm9keSByZXNwZWN0byBhbCBoZWFkZXJcclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGhlYWRlciA9ICQoJyNqcy1oZWFkZXInKTtcclxuICB2YXIgaGVhZGVySGVpZ2h0ID0gaGVhZGVyLmhlaWdodCgpO1xyXG4gICQoJ2JvZHkuaHRtbCcpLmNzcygncGFkZGluZy10b3AnLCBoZWFkZXJIZWlnaHQgKyAncHgnKTtcclxufSkoKTsiLCIvL1JlZXNjcmliaXIgZWwgbGF5b3V0IGRlbCBob21lXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciBmcm9udCA9ICQoJy5mcm9udCcpO1xyXG5cclxuICAvLyBjb250ZW50IHkgc2lkZWJhciBhIDUwLTUwXHJcbiAgZnJvbnQuZmluZCgnI2NvbnRlbnQnKS5yZW1vdmVDbGFzcygnd2ViLTcwJykuYWRkQ2xhc3MoJ2VkLWl0ZW0gd2ViLTUwJyk7XHJcbiAgZnJvbnQuZmluZCgnI3NpZGViYXJfc2Vjb25kJykucmVtb3ZlQ2xhc3MoJ3dlYi0zMCcpLmFkZENsYXNzKCdlZC1pdGVtIHdlYi01MCBuby1wYWRkaW5nJyk7XHJcblxyXG4gIC8vIGxhIHJlZ2lvbiBpbnRlcm5hIGRlbCBzaWRlYmFyIHNlcsOhIHVuIGVkLWNvbnRhaW5lclxyXG4gIGZyb250LmZpbmQoJy5yZWdpb24tc2lkZWJhci1zZWNvbmQnKS5hZGRDbGFzcygnZWQtY29udGFpbmVyJyk7XHJcblxyXG4gIC8vIFB1YmxpY2EgZW4gZW11ZHlcclxuICBmcm9udC5maW5kKCcjYmxvY2stYmxvY2stMycpLmFkZENsYXNzKCdlZC1pdGVtIHdlYi00NScpO1xyXG5cclxuICAvLyBQdWJsaWNhIGVuIGVtdWR5ICh1c3VhcmlvIHJlZ2lzdHJhZG8pXHJcbiAgZnJvbnQuZmluZCgnI2Jsb2NrLWJsb2NrLTEyJykuYWRkQ2xhc3MoJ2VkLWl0ZW0gd2ViLTQ1Jyk7XHJcblxyXG4gIC8vIEFkc2Vuc2UgY3VhZHJhZG9cclxuICBmcm9udC5maW5kKCcjYmxvY2stYmxvY2stNCcpLmFkZENsYXNzKCdlZC1pdGVtIHdlYi01NScpO1xyXG5cclxuICAvLyBBZHNlbnNlIHZlcnRpY2FsXHJcbiAgZnJvbnQuZmluZCgnI2Jsb2NrLWJsb2NrLTUnKS5hZGRDbGFzcygnZWQtaXRlbSB3ZWItMzAnKTtcclxuXHJcbiAgLy8gUG9zdHMgcmVjaWVudGVzXHJcbiAgZnJvbnQuZmluZCgnI2Jsb2NrLXZpZXdzLXBvc3RzLWJsb2NrLTInKS5hZGRDbGFzcygnZWQtaXRlbSB3ZWItNzAnKTtcclxuXHJcbiAgLy8gTW92ZXIgZWwgbWVudSB2ZXJ0aWNhbFxyXG4gIGZyb250LmZpbmQoJyNibG9jay1ibG9jay04JykucHJlcGVuZFRvKCcjYmxvY2stYmxvY2stNScpO1xyXG5cclxuICAvLyBPY3VsdGFyIHRpdHVsbyBlbiBob21lXHJcbiAgZnJvbnQuZmluZCgnaDEnKS5oaWRlKCk7XHJcbn0pKCk7XHJcblxyXG5cclxuLy8gSW5zZXJ0YXIgYm90b24gc2lndWVub3MgZW50cmUgbG9zIHBvc3RzIHJlY2llbnRlcyBkZWwgaG9tZVxyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgc2lndWVub3MgPSAkKCc8YSBocmVmPVwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2VtdWR5aXNnZW5pYWxcIiBjbGFzcz1cInNpZ3Vlbm9zXCI+RGFsZSBtZSBndXN0YSB5IHJlY2liZSBtw6FzIHBvc3RpbmcgPGRpdiBjbGFzcz1cImZiLWxpa2VcIiBkYXRhLWhyZWY9XCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vZW11ZHlpc2dlbmlhbFwiIGRhdGEtd2lkdGg9XCJhdXRvXCIgZGF0YS1sYXlvdXQ9XCJidXR0b25fY291bnRcIiBkYXRhLWFjdGlvbj1cImxpa2VcIiBkYXRhLXNob3ctZmFjZXM9XCJ0cnVlXCIgZGF0YS1zaGFyZT1cImZhbHNlXCI+PC9kaXY+PC9hPicpO1xyXG4gIHZhciBwb3N0c0Rlc3RhY2Fkb3MgPSAkKCcjYmxvY2stc3lzdGVtLW1haW4nKS5maW5kKCcudmlldy1wb3N0cycpLmZpbmQoJy52aWV3cy1yb3cnKTtcclxuICBwb3N0c0Rlc3RhY2Fkb3MuZXEoMikuYWZ0ZXIoc2lndWVub3MpO1xyXG59KSgpO1xyXG5cclxuIiwiLy8gTW92ZXIgbGEgbWV0YWRhdGEgZGUgbG9zIHBvc3RzIGVuIHRhbWHDsW9zIHBlcXVlw7Fvc1xyXG4oZnVuY3Rpb24oKXtcclxuICBpZigkKHdpbmRvdykud2lkdGgoKSA8IDUwMCkge1xyXG4gICAgJCgnLnZpZXctcG9zdHMnKS5maW5kKCcucG9zdC0tbWFpbiAucG9zdF9fZGF0YScpLmVhY2goZnVuY3Rpb24oaSxlbCl7XHJcbiAgICAgIHZhciBwYXJlbnQgPSAkKGVsKS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgICAgJChlbCkuYXBwZW5kVG8ocGFyZW50KS5hZGRDbGFzcygnYXBwZW5kJyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG4vLyBhw7FhZGlyIGxpbmsgYSBsYXMgaW3DoWdlbmVzIGRlIGxvcyBwb3N0cyBlbiBsYXMgdmlzdGFzXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciB2aWV3UG9zdHMgPSAkKCcudmlldy1wb3N0cycpLmZpbmQoJy5wb3N0Jyk7XHJcbiAgdmlld1Bvc3RzLmVhY2goZnVuY3Rpb24oaSxlbCl7XHJcbiAgICB2YXIgaW1nID0gJChlbCkuZmluZCgnaW1nJyk7XHJcbiAgICB2YXIgaHJlZiA9ICQoZWwpLmZpbmQoJ2EnKS5hdHRyKCdocmVmJyk7XHJcbiAgICBpbWcud3JhcCgnPGEgaHJlZj1cIicgKyBocmVmICsgJ1wiIC8+JyApO1xyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuLy8gTW92ZXIgbGlua3MgZGViYWpvIGRlbCB0aXR1bG9cclxuKGZ1bmN0aW9uKCl7XHJcbiAgJCgnLmxpbmtzLmlubGluZScpLmluc2VydEFmdGVyKCQoJy5maWVsZC1uYW1lLWZpZWxkLXN1YnRpdHVsbycpKTtcclxufSkoKTtcclxuXHJcbi8vIENhbWJpYXIgdGV4dG8gbGVjdHVyYXMgcG9yIHZpc3RhcyBlbiBsb3MgcG9zdHNcclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHZpc3RhcyA9ICQoJy5wYWdlLW5vZGUnKS5maW5kKCcuc3RhdGlzdGljc19jb3VudGVyIHNwYW4nKTtcclxuICB2YXIgdGV4dG9OdWV2byA9IHZpc3Rhcy50ZXh0KCkucmVwbGFjZShcImxlY3R1cmFzXCIsXCJ2aXN0YXNcIikgfHwgdmlzdGFzLnRleHQoKS5yZXBsYWNlKFwibGVjdHVyYVwiLFwidmlzdGFcIik7XHJcbiAgdmlzdGFzLnRleHQodGV4dG9OdWV2byk7XHJcbn0pKCk7XHJcblxyXG5cclxuLy8gVXNhciBlbCB0ZXh0byBhbHQgY29tbyBsZXllbmRhIGRlIGxhcyBpbWFnZW5lc1xyXG5cclxuJCgnLmZpZWxkLW5hbWUtYm9keScpLmZpbmQoJ2ltZycpLmVhY2goZnVuY3Rpb24oaSxlbCl7XHJcbiAgdmFyIHRpdGxlID0gJChlbCkuYXR0cignYWx0Jyk7XHJcbiAgJChlbCkud3JhcCgnPGZpZ3VyZSBjbGFzcz1cImZpZ3VyZVwiIC8+Jyk7XHJcbiAgJChlbCkucGFyZW50KCkuYXBwZW5kKCc8ZmlnY2FwdGlvbj4nICsgdGl0bGUgKyAnPC9maWdjYXB0aW9uPicpXHJcbn0pOyIsIi8vIEFicmlyIGxhIHZlbnRhbmEgbW9kYWwgZGUgbG9naW5cclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGxvZ2luQmxvY2sgPSAkKCcjYmxvY2stdXNlci1sb2dpbicpO1xyXG4gIHZhciBsb2dpbiA9ICQoJyNsb2dpbicpO1xyXG4gIGxvZ2luLmFkZCgkKCcjYmxvY2stYmxvY2stMycpKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbG9naW5CbG9jay5hZGRDbGFzcygnc2hvdycpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBBYnJpciBlbCBtb2RhbCBkZSBsb2dpbiBjb24gZWwgZmFrZSBmbGFnXHJcbiAgJCgnLm5vdC1sb2dnZWQtaW4gLmxpbmtzJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbG9naW4udHJpZ2dlcignY2xpY2snKTtcclxuICB9KTtcclxuXHJcbiAgLy8gQcOxYWRpciBib3TDs24gZGUgY2VycmFyXHJcbiAgbG9naW5CbG9jay5maW5kKCdmb3JtJykuYXBwZW5kKCc8YSBpZD1cImNlcnJhclwiIGNsYXNzPVwiaWNvbi1jZXJyYXJcIj48L2E+Jyk7XHJcbiAgJCgnI2NlcnJhcicpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGxvZ2luQmxvY2sucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuICB9KTtcclxuXHJcbiAgLy8gQcOxYWRpciBib3TDs24gZGUgZmFjZWJvb2sgYWwgbG9naW5cclxuICBsb2dpbkJsb2NrLmZpbmQoJy5mb3JtLWFjdGlvbnMnKS5iZWZvcmUoJzxhIGhyZWY9XCIvZW11ZHkvdXNlci9zaW1wbGUtZmItY29ubmVjdFwiJyArXHJcbiAgICAnIGNsYXNzPVwiZmFjZWJvb2stbG9naW5cIj5JbmljaWFyIGNvbiBGYWNlYm9vayA8c3BhbiBjbGFzcz1cImljb24tZmFjZWJvb2tcIj48L3NwYW4+PC9hPicpXHJcbn0pKCk7IiwiLy8gT3JnYW5pemFyIHBlcmZpbCBkZSB1c3VhcmlvXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciByZWRlcyA9ICQoJy5ncm91cC1yZWRlcycpO1xyXG4gIHJlZGVzLmZpbmQoJ2EnKS50ZXh0KCcnKTtcclxuICByZWRlcy5maW5kKCdkbCcpLmFwcGVuZFRvKCcudXNlci1waWN0dXJlJyk7XHJcbiAgcmVkZXMuaW5zZXJ0QWZ0ZXIoJyNwYWdlLXRpdGxlJyk7XHJcblxyXG4gICQoJy5wYWdlLXVzZXIgI3BhZ2UtdGl0bGUnKS5hZGQoJy5ncm91cC1yZWRlcycpLndyYXBBbGwoJzxoZWFkZXIgY2xhc3M9XCJhdXRvci1oZWFkZXJcIiAvPicpO1xyXG4gICQoJy5wYWdlLXVzZXItZWRpdCAjcGFnZS10aXRsZScpLmluc2VydEJlZm9yZSgnI3VzZXItcHJvZmlsZS1mb3JtJyk7XHJcbiAgJCgnLnBhZ2UtdXNlci1lZGl0IC50YWJzJykuaW5zZXJ0QWZ0ZXIoJyNwYWdlLXRpdGxlJyk7XHJcblxyXG4gIC8vIE1ldGVyIGVsIGVtdWR5LXN0YWZmIGRlbnRybyBkZWwgYXV0b3IgaGVhZGVyXHJcbiAgdmFyIGF1dG9ySGVhZGVyID0gJCgnLmF1dG9yLWhlYWRlcicpO1xyXG4gICQoJyNlbXVkeS1zdGFmZicpLmFwcGVuZFRvKGF1dG9ySGVhZGVyLmZpbmQoJ2gxJykpO1xyXG4gICQoYXV0b3JIZWFkZXIpLnByZXBlbmRUbygkKCcuZmllbGQtbmFtZS1maWVsZC1iaW8nKSk7XHJcbn0pKCk7XHJcblxyXG4vLyBQb25lciBsb3MgdGFicyBlbiBsYSBwb3NpY2lvbiBjb3JyZWN0YSBlbiBsYSBww6FnaW5hIGRlIGFjdGl2aWRhZCBkZWwgdXN1YXJpb1xyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgYm9keSA9ICQoJ2JvZHknKTtcclxuICBpZihib2R5Lmhhc0NsYXNzKCdwYWdlLXVzZXInKSAmJiAhYm9keS5oYXNDbGFzcygncGFnZS11c2VyLXRyYWNrJykpIHtcclxuICAgICQoJy50YWJzJykuaW5zZXJ0QWZ0ZXIoJyNibG9jay1zeXN0ZW0tbWFpbicpO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbi8vIENhbWJpYXIgdGV4dG8gZGVsIHRhYiBTZWd1aW1pZW50byBwb3IgQWN0aXZpZGFkIGRlbCBwZXJmaWwgZGUgdXN1YXJpb3NcclxuKGZ1bmN0aW9uKCl7XHJcbiAgJCgnLnRhYnMnKS5maW5kKCdhJykuZWFjaChmdW5jdGlvbihpLGVsKXtcclxuICAgIGlmKCQoZWwpLnRleHQoKS5pbmRleE9mKCdTZWd1aW1pZW50bycpICE9PSAtMSl7XHJcbiAgICAgICQoZWwpLnRleHQoJ0FjdGl2aWRhZCcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuLy8gU29sbyBpY29ub3MgZW4gZWwgYmxvcXVlIGRlIGF1dG9yIGRlIHBvc3RcclxuKGZ1bmN0aW9uKCl7XHJcbiAgJCgnLmF1dG9yX19yZWRlcycpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbihpLGVsKXtcclxuICAgIHZhciBsaW5rID0gJChlbCkuZmluZCgnYScpLmF0dHIoJ2hyZWYnKTtcclxuICAgICQoZWwpLmZpbmQoJ2EnKS5oaWRlKCk7XHJcbiAgICAkKGVsKS53cmFwKCc8YSBocmVmPVwiJyArIGxpbmsgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCIgLz4nKTtcclxuICB9KTtcclxufSkoKTtcclxuXHJcbi8vIEHDsWFkaXIgaW5zaWduaWEgYWwgZW11ZHkgc3RhZmYgZW4gYmxvcXVlIGRlIGF1dG9yXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciBibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9jay12aWV3cy1wZXJzb25hcy1ibG9jaycpO1xyXG4gIHZhciByb2xlcztcclxuICBpZihibG9jayl7XHJcbiAgICByb2xlcyA9IGJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy52aWV3cy1maWVsZC1yaWQgc3BhbicpLnRleHRDb250ZW50O1xyXG4gICAgaWYocm9sZXMuaW5kZXhPZignU3RhZmYnKSA+PSAwKXtcclxuICAgICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnc3RhZmYnKTtcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy8gc2NyaXB0cyBwYXJhIHDDoWdpbmFzIGFkbWluaXN0cmF0aXZhc1xyXG5cclxuLy8gTW92ZXIgYWRkIHBhZ2luYSBhbCBmaW5hbCBjdWFuZG8gc2UgZXMgYWRtaW5cclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHRpcG9zID0gJCgnLm5vZGUtdHlwZS1saXN0JykuZmluZCgnZHQnKTtcclxuICBpZih0aXBvcy5sZW5ndGggPT09IDUpe1xyXG4gICAgdGlwb3MuZXEoMSkuaW5zZXJ0QWZ0ZXIodGlwb3MuZXEoNCkpO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbi8vIENhbWJpYXIgdMOtdHVsbyBhIFwiQ29tcGFydGUgYWxnb1wiIGN1YW5kbyBzZSB2YSBhIHB1YmxpY2FyXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciBsb2MgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gIGlmKGxvYy5pbmRleE9mKFwibm9kZS9hZGRcIikgIT0gLTEgJiYgbG9jLmluZGV4T2YoXCJub2RlL2FkZC9cIikgPT0gLTEpIHtcclxuICAgICQoJ2gxJykudGV4dCgnQ29tcGFydGUgYWxnbzonKTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG4vLyBBw7FhZGlyIGluc3RydWNjaW9uZXMgYSBDS0VEaXRvclxyXG4oZnVuY3Rpb24oKXtcclxuICAkKCcuZm9ybS10eXBlLXRleHRhcmVhIGxhYmVsJykuYWZ0ZXIoJzx1bCBjbGFzcz1cImluc3RydWNjaW9uZXNcIj4nK1xyXG4gICAgICAnPGxpPlBhcmEgaW5zZXJ0YXIgdmlkZW9zIGRlIFlvdVR1YmUgcGVndWUgbGEgVVJMIGRlbnRybyBkZWwgw6FyZWEgZGUgdGV4dG88L2xpPicrXHJcbiAgICAgICc8bGk+UGFyYSBhw7FhZGlyIHRpdHVsb3MgeSBwcm9waWVkYWRlcyBhIGxhcyBpbcOhZ2VuZXMgaGFnYSBjbGljIGRlcmVjaG8gc29icmUgZWxsYXM8L2xpPicgK1xyXG4gICAgJzwvdWw+Jyk7XHJcbn0pKCk7IiwiLy8gVm90YWNpb25cclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHN0YXIxID0gJCgnLnN0YXItMScpO1xyXG4gIHZhciBzdGFyMiA9ICQoJy5zdGFyLTInKTtcclxuICB2YXIgc3RhcjMgPSAkKCcuc3Rhci0zJyk7XHJcbiAgc3RhcjEuY2hpbGRyZW4oJ3NwYW4nKS5hdHRyKCd0aXRsZScsJ05vIG1lIGd1c3TDsycpO1xyXG4gIHN0YXIxLmNoaWxkcmVuKCdhJykuYXR0cigndGl0bGUnLCdObyBtZSBndXN0w7MnKTtcclxuICBzdGFyMi5jaGlsZHJlbignc3BhbicpLmF0dHIoJ3RpdGxlJywnTWUgZ3VzdMOzJyk7XHJcbiAgc3RhcjIuY2hpbGRyZW4oJ2EnKS5hdHRyKCd0aXRsZScsJ01lIGd1c3TDsycpO1xyXG4gIHN0YXIzLmNoaWxkcmVuKCdzcGFuJykuYXR0cigndGl0bGUnLCdBbW8gZXN0ZSBwb3N0Jyk7XHJcbiAgc3RhcjMuY2hpbGRyZW4oJ2EnKS5hdHRyKCd0aXRsZScsJ0FtbyBlc3RlIHBvc3QnKTtcclxufSkoKTsiLCIvLyBNZW51IHByaW5jaXBhbCBlbiBtb3ZpbFxyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgbWVudSA9ICQoJyNibG9jay1zeXN0ZW0tbWFpbi1tZW51JykuZmluZCgnLm1lbnUnKTtcclxuICB2YXIgbWVudVRvZ2dsZSA9ICQoJzxkaXYgaWQ9XCJ0b2dnbGUtbWVudVwiIGNsYXNzPVwiaWNvbi1tZW51IGVzcGFjaW8gaGFzdGEtdGFibGV0XCI+TWVuw7o8L2Rpdj4nKTtcclxuICBtZW51LmJlZm9yZShtZW51VG9nZ2xlKTtcclxuICBtZW51VG9nZ2xlLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIG1lbnUuc2xpZGVUb2dnbGUoKTtcclxuICB9KTtcclxufSkoKTtcclxuXHJcbi8vIE1vc3RyYXIgeSBvY3VsdGFyIGVsIG1lbnUgZGUgdXN1YXJpb1xyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgdXNlck1lbnUgPSAkKCcjYmxvY2stc3lzdGVtLXVzZXItbWVudScpO1xyXG4gIHZhciB1c2VyQmxvY2sgPSAkKCcjYmxvY2stdmlld3MtdXN1YXJpby1hY3R1YWwtYmxvY2snKTtcclxuICB2YXIgdXNlckJsb2NrUmVnaW9uID0gdXNlckJsb2NrLnBhcmVudCgpLnBhcmVudCgpO1xyXG5cclxuICB1c2VyQmxvY2sub24oJ21vdXNlZW50ZXInLGZ1bmN0aW9uKCl7XHJcbiAgICB1c2VyTWVudS5zaG93KCk7XHJcbiAgfSkub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xyXG4gICAgdXNlck1lbnUuaGlkZSgpO1xyXG4gIH0pO1xyXG5cclxuICB1c2VyTWVudS5vbignbW91c2VlbnRlcicsZnVuY3Rpb24oKXtcclxuICAgIHVzZXJCbG9jay50cmlnZ2VyKCdtb3VzZWVudGVyJyk7XHJcbiAgfSkub24oJ21vdXNlbGVhdmUnLGZ1bmN0aW9uKCl7XHJcbiAgICB1c2VyQmxvY2sudHJpZ2dlcignbW91c2VsZWF2ZScpO1xyXG4gIH0pO1xyXG59KSgpOyIsIi8vIEHDsWFkaXIgaWNvbm9zIGEgbGFzIHJlZGVzIHNvY2lhbGVzXHJcbihmdW5jdGlvbigpe1xyXG4gICQoJy5maWVsZC1uYW1lLWZpZWxkLWZhY2Vib29rJykuZmluZCgnYScpLmFkZENsYXNzKCdpY29uLWZhY2Vib29rIGVzcGFjaW8nKTtcclxuICAkKCcuZmllbGQtbmFtZS1maWVsZC10d2l0dGVyJykuZmluZCgnYScpLmFkZENsYXNzKCdpY29uLXR3aXR0ZXIgZXNwYWNpbycpO1xyXG4gICQoJy5maWVsZC1uYW1lLWZpZWxkLWluc3RhZ3JhbScpLmZpbmQoJ2EnKS5hZGRDbGFzcygnaWNvbi1pbnN0YWdyYW0gZXNwYWNpbycpO1xyXG4gICQoJy5maWVsZC1uYW1lLWZpZWxkLXlvdXR1YmUnKS5maW5kKCdhJykuYWRkQ2xhc3MoJ2ljb24teW91dHViZSBlc3BhY2lvJyk7XHJcbiAgJCgnLmZpZWxkLW5hbWUtZmllbGQtbGlua2VkaW4nKS5maW5kKCdhJykuYWRkQ2xhc3MoJ2ljb24tbGlua2VkaW4gZXNwYWNpbycpO1xyXG4gICQoJy5maWVsZC1uYW1lLWZpZWxkLXBpbnRlcmVzdCcpLmZpbmQoJ2EnKS5hZGRDbGFzcygnaWNvbi1waW50ZXJlc3QgZXNwYWNpbycpO1xyXG59KSgpOyIsIi8vIEHDsWFkaXIgbGluayBhbCBub2RvIGVuIGxhIG1pbmlhdHVyYSBkZSBsb3MgdmlkZW9zXHJcbihmdW5jdGlvbigpe1xyXG4gICQoJy52aWV3LXZpZGVvcycpLmZpbmQoJy52aWV3cy1yb3cnKS5lYWNoKGZ1bmN0aW9uKGksZWwpe1xyXG4gICAgdmFyIGxpbmsgPSAkKGVsKS5maW5kKCcudmlld3MtZmllbGQtdGl0bGUgYScpLmF0dHIoJ2hyZWYnKTtcclxuICAgICQoZWwpLmZpbmQoJy52aWV3cy1maWVsZC1maWVsZC12aWRlbycpLndyYXAoJzxhIGhyZWY9XCInICsgbGluayArICdcIiAvPicpO1xyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuLy8gTGltcGlhciBnb29ndHViZVxyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgZ29vZ3R1YmVWaWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWVsZC1uYW1lLWJvZHkgb2JqZWN0Jyk7XHJcbiAgaWYoZ29vZ3R1YmVWaWRlbyl7XHJcbiAgICBnb29ndHViZVZpZGVvLnByZXZpb3VzU2libGluZy5yZW1vdmUoKTtcclxuICB9XHJcbn0pKCk7IiwiLy8gQcOxYWRpciBwbGFjZWhvbGRlciBhbCBibG9xdWUgZGUgYsO6c3F1ZWRhXHJcbiQoJyNibG9jay1zZWFyY2gtZm9ybScpLmZpbmQoJ1t0eXBlPVwidGV4dFwiXScpLmF0dHIoJ3BsYWNlaG9sZGVyJywnQnVzY2FyJyArXHJcbiAgJyBlbiBFbXVkeScpO1xyXG5cclxuLy8gY29tZW50YXJpb3MgYWwgZmluYWwgZGUgbG9zIHBvc3QgcmVsYWNpb25hZG9zXHJcbiQoJy5mYi1jb21tZW50cycpLmFwcGVuZFRvKCcjY29udGVudCcpO1xyXG5cclxuLy8gVGV4dG8gZGUgYm90b25lcyBwYXJhIHB1YmxpY2FyXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciBwdWJsaXNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2Utbm9kZS1hZGQgI2VkaXQtc3VibWl0Jyk7XHJcbiAgaWYocHVibGlzaEJ1dHRvbiAmJiBsb2NhdGlvbi5ocmVmLmluZGV4T2YoJ25vZGUvYWRkJykgPj0gMCl7XHJcbiAgICBwdWJsaXNoQnV0dG9uLnZhbHVlID0gXCJQdWJsaWNhclwiO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbi8vIEluc2VydGFyIGVsIGFkc2Vuc2UgZGVudHJvIGRlbCBsaXN0YWRvIGRlIHBvc3RzIGRlbCBzaWRlYmFyXHJcbiQoJyNibG9jay1ibG9jay00JykuaW5zZXJ0QWZ0ZXIoJCgnI2Jsb2NrLXZpZXdzLXBvc3RzLWJsb2NrLTQnKS5maW5kKCcudmlld3Mtcm93JykuZXEoMykpOyIsIn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
