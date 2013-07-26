var keyframeHandler = function(options){
  var keyframes = options.target.keyframes;

  // create a new keyframe
  keyframes[App.currentFrame] = App.getProps(options.target);
  keyframes[6000] = App.getProps(options.target);

  // update the keyframe index array
  keyframes['index'].contains(App.currentFrame) || keyframes['index'].push(App.currentFrame);
  keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
};

App.canvas.on('object:modified', keyframeHandler);
App.canvas.on('object:added', keyframeHandler);