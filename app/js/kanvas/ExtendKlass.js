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

    var interpolate = function(s, e, sT, d, cT){
        return s + (((e - s) / d) * (cT - sT));
    };

    var startKey = keyIndex[scan -1];
    var endKey = keyIndex[scan] || startKey;
    var duration = endKey - startKey;

    var options = {};
    for(var property in keyframes[endKey]){
      if(property === 'visible'){
        options[property] = keyframes[startKey][property];
      } if(property === 'fill'){
        var startColor = new fabric.Color(keyframes[startKey][property]);
        var endColor = new fabric.Color(keyframes[endKey][property]);
        if(startColor.toHex() !== endColor.toHex()){
        var mixedColor = [];
        for(var i = 0; i < endColor.getSource().length; i++){
          var someNum = startColor.getSource()[i] + ((endColor.getSource()[i] - startColor.getSource()[i]) / duration)*(t - keyIndex[scan-1]);
          mixedColor[i] = Math.round(someNum || 0);
        }
        var col = new fabric.Color('rgb('+ mixedColor[0] +',' + mixedColor[1] + ',' + mixedColor[2] + ')');
        console.log(col.toHex());
        options[property] = col.toHex();
        }
      } else if (keyframes[startKey]['visible'] === true && keyframes[startKey][property] !== keyframes[endKey][property]) {
        options[property] = interpolate(keyframes[startKey][property], keyframes[endKey][property], keyIndex[scan-1], duration, t);
      }
    }
    this.set(options).setCoords();

};
