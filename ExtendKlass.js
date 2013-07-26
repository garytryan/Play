App.addKeys = function(klass){
  var result = klass;
  result.keyframes = {0: {visible: false}, index:[0]};
  return result;
};

fabric.Object.prototype.anim = function(t){
    var keyframes = this.keyframes;
    var keyIndex = this.keyframes.index;

    var scan = (function(){
      var result = 0;
      while(keyIndex[result] < t){
        result++;
      }
      return result;
    })();

    var startTime = keyIndex[scan -1];
    var endTime = keyIndex[scan] || 0;
    var duration = endTime - startTime;

    var options = {};
    for(var property in keyframes[endTime]){
      if(property === 'visible'){
        options[property] = keyframes[startTime][property];
      } else if (keyframes[startTime][property] && keyframes[startTime][property] !== keyframes[endTime][property]) {
        var motionPerFrame = (keyframes[endTime][property] - keyframes[startTime][property]) / duration;
        options[property] = keyframes[startTime][property] + motionPerFrame*(t - keyIndex[scan-1]);
      }
    }
    this.set(options).setCoords();
    App.canvas.renderAll();
};

//should always have a 0 keyframes
// 0 keyframe should be visible false