App.makeAnimShape = function(object) {
  var result = object;
  result.newFrame = function(t){
    if(t < 1000){
      this.setAttr('x', this.attrs.x + (0.005 * t));
    }
    if(t > 1000 && t < 1400){
      this.setAttr('y', this.attrs.y + (0.005 * t));
    }
  };
  return result;
};

App.addShape = {
  _shape: null,
  editable: false,
  defaultProp: {
    x: 50,
    y: 50,
    height: 100,
    width: 100,
    fill:        'blue',
    stroke:      'black',
    draggable:   'true'
  },

  init: function(type, properties){
    properties = properties || this.defaultProp;
    shapeLayer.add(App.makeAnimShape(new Kinetic[type](properties)));
    shapeLayer.draw();
  }
};

App.stage.STAGE.add(shapeLayer);

App.addShape.init('Rect');
App.addShape.init('Rect', {
      x: 300,
      y: 300,
      height: 50,
      width: 50,
      fill:        'green',
      stroke:      'black',
      draggable:   'true'
    });

var anim = new Kinetic.Animation(function(frame) {
  var time = frame.time,
      timeDiff = frame.timeDiff,
      frameRate = frame.frameRate;

  // update stuff
  var shape = shapeLayer.children;
  for(var i = 0; i < shapeLayer.children.length; i++){
    shape[i].newFrame(time);
  }
}, shapeLayer);