$(function(){
  var $frame = $('#frame');
  $('[type="range"]').on('change', function(){
    $frame.html(this.value);
    var shape = shapeLayer.children;
    for(var i = 0; i < shapeLayer.children.length; i++){
      shape[i].newFrame(this.value);
    }
    shapeLayer.draw();
  });
});