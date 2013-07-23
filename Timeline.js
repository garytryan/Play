var second = 0;

$(function(){
  $('#slide').on('change', function(){
    second = this.value;
    updateDisplay(second);
  });
});


// take a snap shot at 0
// move time bar
// move shape
// take snap shot of shape

App.keyframes = {

  reel: {},

  add: function(target){
    this.reel[second] = {
      target: target,
      x: target.getAttr('x'),
      y: target.getAttr('y')
    };
  }
};

var stopFrame = function(){
  var keys = [];
  var frames = new Array(120);
  for(var key in App.keyframes.reel){
    keys.push(key);
  }
  keys.sort();
  // loop through start and end keys
  for(var i = 0; i < keys.length-1; i++){
    var diff = {};
    var startTime = keys[i];
    var endTime = keys[i+1];
    var startKeyframe = App.keyframes.reel[startTime];
    var endKeyframe = App.keyframes.reel[endTime];


    // push frames 
    for(j = startTime; j < endTime; j++){
      diff.x = (endKeyframe.x - startKeyframe.x / startTime - endTime) * j;
      diff.y = (endKeyframe.y - startKeyframe.y / startTime - endTime) * j;
      frames[j] = diff;
    }
  }

  return frames;
};