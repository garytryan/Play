App.addShape = {
  init: function(type, properties, keyFrames){
    properties = properties || this.defaultProp;
    App.canvas.add(App.addKeys(new fabric[type](properties)));
  }
};;var keyframeHandler = function(options){
  var keyframes = options.target.keyframes;

  // create a new keyframe
  keyframes[App.currentFrame] = App.getProps(options.target);

  // update the keyframe index array
  keyframes['index'].contains(App.currentFrame) || keyframes['index'].push(App.currentFrame);
  keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
};

App.canvas.on('object:modified', keyframeHandler);
App.canvas.on('object:added', keyframeHandler);

App.getProps = function(target){
  var prop = {};
  prop['top']     = target.top;
  prop['left']    = target.left;
  prop['scaleX']  = target.scaleX;
  prop['scaleY']  = target.scaleY;
  prop['angle']   = target.angle;
  prop['height']  = target.height;
  prop['width']   = target.width;
  prop['visible'] = true;
  return prop;
};;App.addKeys = function(klass){
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
    App.canvas.renderAll();
};
;$(function(){
  var $frame = $('#frame');
  $('[type="range"]').on('change', function(){
    App.currentFrame = this.value * 1;
    $frame.html(this.value);
    var klass = App.canvas.getObjects();
    for(var i = 0; i < klass.length; i++){
      klass[i].anim(App.currentFrame);
    }
  });
});;$(function(){
  $('#rect').on('click', function(){
    App.addShape.init('Rect', {
      top: 400, left: 400, height: 100, width: 100, stroke: 'grey', strokeWidth: 2, fill: 'rgba(0,0,0,0.1)', visible: true
    });
  });
  $('#circ').on('click', function(){
    App.addShape.init('Circle', {
      top: 400, left: 400, radius: 50, stroke: 'grey', strokeWidth: 2, fill: 'rgba(0,0,0,0.1)', visible: true
    });
  });
  $('#tri').on('click', function(){
    App.addShape.init('Triangle', {
      top: 400, left: 400, height: 100, width: 100,  stroke: 'grey', strokeWidth: 2, fill: 'rgba(0,0,0,0.1)', visible: true
    });
  });
});;// checks to see if an array holds a value
Array.prototype.contains = function(target){
  for(i = 0; i < this.length; i++){
    if(this[i] === target){
      return true;
    }
  }
  return false;
};;var App = {};

// create a wrapper around native canvas element (with id="c")
App.canvas = new fabric.Canvas('c');
App.currentFrame = 0;
