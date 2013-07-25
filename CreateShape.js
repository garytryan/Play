App.makeAnimShape = function(object) {
  var result = object;
  result.newFrame = function(t){
    var keyFrames = {
      0: {x:0},
      3000: {x: 600}
    };
    var keyframeTimes = [0, 3000];
    startTime = keyframeTimes[0]; // The last vistited keyframe
    endTime = keyframeTimes[1];
    duration = endTime - startTime;
    motionPerFrame = (keyFrames[endTime].x - keyFrames[startTime].x) / duration;
    if(this.attrs.x < keyFrames[endTime].x){
      this.setAttr('x', keyFrames[startTime].x + (motionPerFrame*t));
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