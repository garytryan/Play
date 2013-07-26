var keyframeHandler = function(options){
  var keyframes = options.target.keyframes;

  // Set properties
  var prop = {};
  prop['top']     = options.target.top;
  prop['left']    = options.target.left;
  prop['scaleX']  = options.target.scaleX;
  prop['scaleY']  = options.target.scaleY;
  prop['angle']   = options.target.angle;
  prop['height']  = options.target.height;
  prop['width']   = options.target.width;
  prop['visible'] = true;

  // create a new keyframe
  keyframes[App.currentFrame] = prop;
  keyframes[6000] = prop;

  // update the keyframe index array
  keyframes['index'].contains(App.currentFrame) || keyframes['index'].push(App.currentFrame);
  keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
};

App.canvas.on('object:modified', keyframeHandler);
App.canvas.on('object:added', keyframeHandler);