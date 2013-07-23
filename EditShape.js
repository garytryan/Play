
var editShape = function(shape){
  var focus = false;
  var editing = false;

  shape.on('mousedown', function(){
    shape.setAttr('fill', 'green');
    focus = true;
    shapeLayer.draw();
  });


  App.stage.on('mousemove', function(){
    if(focus){
      if(cornerCollision(shape)){
         App.stage.on('mousedown', function(){
            editing = true;
         });
         App.stage.on('mouseup', function(){
            editing = false;
         });
      }
    }

    if(focus && editing){
        shape.setAttrs({
          'fill' : 'red',
          'width': App.stage.STAGE.mousePos.x  - shape.getAttr('x'),
          'height': App.stage.STAGE.mousePos.y - shape.getAttr('y')
        });
      }
      shapeLayer.draw();
  });
};
