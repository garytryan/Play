$(function(){
  $('[type="range"]').on('change', function(){
    var shape = shapeLayer.children;
    for(var i = 0; i < shapeLayer.children.length; i++){
      shape[i].newFrame(this.value);
    }
    shapeLayer.draw();
  });
});