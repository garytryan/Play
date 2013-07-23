var shapeLayer = new Kinetic.Layer();

var addShape = function(type){
  var editable = false;

  var defaultProp = {
    fill:        'blue',
    stroke:      'black',
    draggable:    true
  };

  var _shape = new Kinetic[type](defaultProp);

  // Make shape editable
  editShape(_shape);

  var mousedownHandler = function(){
    _shape.setAttrs({
      x: App.stage.STAGE.mousePos.x,
      y: App.stage.STAGE.mousePos.y
    });
    editable = true;

    //Render
    shapeLayer.add(_shape);
  };

  // set the initial starting cooridnates of the shape
  App.stage.on('mousedown', mousedownHandler);

  // set the height and width of the shape bases on the mouse movement
  // and re-render each time
  App.stage.on('mousemove', function(){
    if(editable){
      _shape.setAttrs({
        'width': App.stage.STAGE.mousePos.x  - _shape.getAttr('x'),
        'height': App.stage.STAGE.mousePos.y - _shape.getAttr('y')
      });

      //Render
      shapeLayer.draw();
    }
  });

  // stop editing the shape once mouse is up
  App.stage.on('mouseup', function(){
    editable = false;
    App.stage.off('mousedown', mousedownHandler);
  });

};

App.stage.STAGE.add(shapeLayer);

addShape('Rect');