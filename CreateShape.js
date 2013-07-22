var shapeLayer = new Kinetic.Layer();

var addShape = function(type){
  var editable = false;

  var defaultProp = {
    fill:     'blue',
    stroke:   'black'
  };

  var _shape = new Kinetic[type](defaultProp);

  // set the initial starting cooridnates of the shape
  App.stage.on('mousedown', function(){
    _shape.attrs.x = App.stage.STAGE.mousePos.x;
    _shape.attrs.y = App.stage.STAGE.mousePos.y;
    editable = true;

    //Render
    App.stage.STAGE.add(shapeLayer.add(_shape));
  });

  // set the height and width of the shape bases on the mouse movement
  // and re-render each time
  App.stage.on('mousemove', function(){
    if(editable){
      var height, width;
      width = App.stage.STAGE.mousePos.x  - _shape.getAttr('x');
      height = App.stage.STAGE.mousePos.y - _shape.getAttr('y');
      _shape.setAttrs({'width': width, 'height': height});

      //Render
      App.stage.STAGE.add(shapeLayer.add(_shape));
    }
  });

  // stop editing the shape once mouse is up
  App.stage.on('mouseup', function(){
    editable = false;
  });

};


addShape('Rect');