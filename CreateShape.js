App.makeAnimShape = function(object, keys) {
  var result = object;
  result.keyFrames = keys;
  result.newFrame = function(t){
    var keyFrames = result.keyFrames;
    var keyframeTimes = result.keyFrames.index;

    var scan = (function(){
      var result = 1;
      while(keyframeTimes[result] < t){
        result++;
      }
      return result;
    })();

    var startTime = keyframeTimes[scan -1];
    var endTime = keyframeTimes[scan];
    var duration = endTime - startTime;
    for(var property in keyFrames[endTime]){
      var motionPerFrame = (keyFrames[endTime][property] - keyFrames[startTime][property]) / duration;
      this.setAttr(property, keyFrames[startTime][property] + motionPerFrame*(t - keyframeTimes[scan-1]));
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

  init: function(type, properties, keyFrames){
    properties = properties || this.defaultProp;
    shapeLayer.add(App.makeAnimShape(new Kinetic[type](properties), keyFrames));
    shapeLayer.draw();
  }
};

App.stage.STAGE.add(shapeLayer);

App.addShape.init('Rect', {
      x: 300,
      y: 300,
      height: 50,
      width: 50,
      fill:        'blue',
      stroke:      'black',
      draggable:   'true'
    },
    {
      0:    {x: 0,   y: 50},
      1000: {x: 0,   y: 100},
      3000: {x: 300, y: 200},
      6000: {x: 400, y: 200},
      index: [0, 1000, 3000, 6000]
});
App.addShape.init('Rect', {
      x: 300,
      y: 300,
      height: 50,
      width: 50,
      fill:        'green',
      stroke:      'black',
      draggable:   'true'
    },{
      0:    {x: 200, y: 100, rotationDeg: 90},
      1000: {x: 100, y: 100, rotationDeg: 120},
      3000: {x: 500, y: 100, rotationDeg: 160},
      6000: {x: 100, y: 100, rotationDeg: 0},
      index: [0, 1000, 3000, 6000]
});
App.addShape.init('Rect', {
      x: 300,
      y: 300,
      height: 50,
      width: 50,
      fill:        'blue',
      stroke:      'black',
      draggable:   'true'
    },
    {
      0:    {x: 10,   y: 50},
      1000: {x: 20,   y: 10},
      3000: {x: 400, y: 50},
      6000: {x: 800, y: 200},
      index: [0, 1000, 3000, 6000]
});
App.addShape.init('Rect', {
      x: 300,
      y: 300,
      height: 50,
      width: 50,
      fill:        'green',
      stroke:      'black',
      draggable:   'true'
    },{
      0:    {x: 20, y: 10},
      1000: {x: 100, y: 100},
      3000: {x: 50, y: 10},
      6000: {x: 10, y: 100},
      index: [0, 1000, 3000, 6000]
});
App.addShape.init('Wedge', {
      x: 300,
      y: 300,
      radius: 70,
      angleDeg: 50,
      fill:        'blue',
      stroke:      'black',
      draggable:   'true'
    },
    {
      0:    {x: 800,   y: 50, angleDeg: 180},
      1000: {x: 20,   y: 800, angleDeg: 200},
      3000: {x: 200, y: 500, angleDeg: 240},
      6000: {x: 200, y: 200, angleDeg: 10},
      index: [0, 1000, 3000, 6000]
});
App.addShape.init('Circle', {
      x: 300,
      y: 300,
      radius: 100,
      fill:        'red',
      stroke:      'black',
      draggable:   'true'
    },{
      0:    {x: 800, y: 800},
      1000: {x: 500, y: 50},
      3000: {x: 800, y: 100},
      6000: {x: 100, y: 800},
      index: [0, 1000, 3000, 6000]
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