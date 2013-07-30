define(['../kanvas/getProperties', './reel', './app'],
  function(getProperties, reel, app){
    var kanvas = new fabric.Canvas('kanvas');

    var keyframeHandler = function(options){
      var keyframes = options.target.keyframes;
      var currentFrame = app.currentFrame;
      // create a new keyframe
      keyframes[currentFrame] = getProperties(options.target);

      // update the keyframe index array
      keyframes['index'].indexOf(currentFrame) === -1 && keyframes['index'].push(currentFrame);
      keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
      console.log(currentFrame);
    };

    kanvas.on('object:modified', keyframeHandler);
    // reel.listenTo('frameChange', function(){ console.log('changedframe'); });
    return kanvas;
});