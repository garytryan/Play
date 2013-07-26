App.canvas.on('object:modified', function(options){
  var keyframes = options.target.keyframes;

  // Set properties
  var prop = {};
  prop['top'] = options.target.top;
  prop['left'] = options.target.left;
  prop['scaleX'] = options.target.scaleX;
  prop['scaleY'] = options.target.scaleY;
  prop['angle'] = options.target.angle;

  // create a new keyframe
  keyframes[App.currentFrame] = prop;
  // update the keyframe index array
  keyframes['index'].contains(App.currentFrame) || keyframes['index'].push(App.currentFrame);
  keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
});