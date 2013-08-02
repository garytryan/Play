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
      } if(property === 'fill'){
        //color diff per frame
        var startColor = new fabric.Color(keyframes[endKey][property]);
        var endColor = new fabric.Color(keyframes[startKey][property]);
        var mixedColor = [];
        for(var i = 0; i < endColor.getSource().length; i++){
          var someNum = endColor.getSource()[i] + ((startColor.getSource()[i] - endColor.getSource()[i]) / duration)*t;
          mixedColor[i] = Math.round(someNum || 0);
        }
        var col = new fabric.Color('rgb('+ mixedColor[0] +',' + mixedColor[1] + ',' + mixedColor[2] + ')');
        console.log(col.toHex());
        options[property] = col.toHex();

      } else if (keyframes[startKey]['visible'] === true && keyframes[startKey][property] !== keyframes[endKey][property]) {
        var motionPerFrame = (keyframes[endKey][property] - keyframes[startKey][property]) / duration;
        options[property] = keyframes[startKey][property] + motionPerFrame*(t - keyIndex[scan-1]);
      }
    }
    this.set(options).setCoords();
};
