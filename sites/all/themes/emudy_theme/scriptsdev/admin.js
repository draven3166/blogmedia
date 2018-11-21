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