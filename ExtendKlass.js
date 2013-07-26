App.addKeys = function(klass){
  var result = klass;
  result.keyframes = {index:[]};
  return result;
};

fabric.Object.prototype.anim = function(t){
    var keyframes = this.keyframes;
    var keyIndex = this.keyframes.index;

    var scan = (function(){
      var result = 1;
      while(keyIndex[result] < t){
        result++;
      }
      return result;
    })();

    var startTime = keyIndex[scan -1];
    var endTime = keyIndex[scan];
    var duration = endTime - startTime;

    var options = {};
    for(var property in keyframes[endTime]){
      var motionPerFrame = (keyframes[endTime][property] - keyframes[startTime][property]) / duration;
      options[property] = keyframes[startTime][property] + motionPerFrame*(t - keyIndex[scan-1]);
    }
    this.set(options).setCoords();
    App.canvas.renderAll();
};