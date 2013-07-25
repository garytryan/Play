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