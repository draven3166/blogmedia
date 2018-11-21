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