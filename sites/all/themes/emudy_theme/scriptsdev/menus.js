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