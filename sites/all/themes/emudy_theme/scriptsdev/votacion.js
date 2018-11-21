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