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
        // start value, end value, startTime, duration, currentTime
        return s + (((e - s) / d) * (cT - sT));
    };

    var startKey = keyIndex[scan -1];
    var endKey = keyIndex[scan] || startKey;
    var duration = endKey - startKey;

    var options = {};
    for(var property in keyframes[endKey]){
      // Toggle visible
      if(property === 'visible'){
        options[property] = keyframes[startKey][property];
      // Tween Start properties
      } else if(property === 'numPoints' || property === 'innerRadius' || property === 'outerRadius') {
        if(keyframes[startKey][property] !== keyframes[endKey][property]){
          this['set' + property.charAt(0).toUpperCase() + property.slice(1)](Math.round(interpolate(keyframes[startKey][property], keyframes[endKey][property], keyIndex[scan-1], duration, t)));
        }
      // Tween Colors
      } else if(property === 'fill'){
        var startColor = new fabric.Color(keyframes[startKey][property]);
        var endColor = new fabric.Color(keyframes[endKey][property]);
        if(startColor.toHex() !== endColor.toHex()){
          var mixedColor = [];
          for(var i = 0; i < endColor.getSource().length; i++){
            mixedColor[i] = Math.round(interpolate(startColor.getSource()[i], endColor.getSource()[i], keyIndex[scan-1], duration, t));
          }
          var result = new fabric.Color('rgb('+ mixedColor[0] +',' + mixedColor[1] + ',' + mixedColor[2] + ')');
          options[property] = result.toHex();
        }
      // Most other properties
      } else if (keyframes[startKey]['visible'] === true && keyframes[startKey][property] !== keyframes[endKey][property]) {
        options[property] = interpolate(keyframes[startKey][property], keyframes[endKey][property], keyIndex[scan-1], duration, t);
      }
    }
    this.set(options).setCoords();

};
