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