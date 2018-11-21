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