
var editShape = function(shape){
  editable = false;

  shape.on('mousedown', function(){
    shape.setAttr('fill', 'green');
    editable = true;
    shapeLayer.draw();
  });

  App.stage.on('mousemove', function(){
    if(editable){
      if(cornerCollision(shape)){

        shape.on('mousedown', function(){
          console.log('dragging corner');
        });

        shape.setAttrs({
          'fill' : 'red',
          'width': App.stage.STAGE.mousePos.x  - shape.getAttr('x'),
          'height': App.stage.STAGE.mousePos.y - shape.getAttr('y')
        });
        shapeLayer.draw();
      }
    }
  });
};
