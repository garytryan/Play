App.makeAnimShape = function(object) {
  var result = object;
  result.newFrame = function(t){
    var keyFrames = {
      0: {x: 0},
      1000: {x: 0},
      3000: {x: 300},
      6000: {x: 600}
    };

    var keyframeTimes = [0, 1000, 3000, 6000];

    // Based on the time calculate the current position of the object;

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
    var motionPerFrame = (keyFrames[endTime].x - keyFrames[startTime].x) / duration;
    if(this.attrs.x < keyFrames[endTime].x){
      this.setAttr('x', keyFrames[startTime].x + motionPerFrame*(t - keyframeTimes[scan-1]));
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
// App.addShape.init('Rect', {
//       x: 300,
//       y: 300,
//       height: 50,
//       width: 50,
//       fill:        'green',
//       stroke:      'black',
//       draggable:   'true'
//     });

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