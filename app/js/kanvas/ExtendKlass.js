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

    var startKey = keyIndex[scan -1];
    var endKey = keyIndex[scan] || startKey;
    var duration = endKey - startKey;

    var options = {};
    for(var property in keyframes[endKey]){
      if(property === 'visible'){
        options[property] = keyframes[startKey][property];
      } else if (keyframes[startKey]['visible'] === true && keyframes[startKey][property] !== keyframes[endKey][property]) {
        var motionPerFrame = (keyframes[endKey][property] - keyframes[startKey][property]) / duration;
        options[property] = keyframes[startKey][property] + motionPerFrame*(t - keyIndex[scan-1]);
      }
    }
    this.set(options).setCoords();
};
