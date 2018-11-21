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