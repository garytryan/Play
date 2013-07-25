App.addKeys = function(klass){
  var result = klass;
  result.keyframes = {0: {top: 50, left: 500}, 2000:{top: 800, left: 800}, index:[0, 2000]};
  return result;
};

fabric.Object.prototype.anim = function(t){
    var keyframes = this.keyframes;
    var keyIndex = this.keyframes.index;
    // this.set(keyframes[t]);
    // App.canvas.renderAll();

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