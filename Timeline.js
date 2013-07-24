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

    App.stopFrame.init();
  }
};

App.stopFrame = {
  keys: [],
  frames: new Array(120),

  init: function(){
    this.keys = [];
    this.sortKeys();
    this.createFrames();
    console.log('stopFrame-init');
  },

  sortKeys: function(){
    for(var key in App.keyframes.reel){
      this.keys.push(key);
    }
    this.keys.sort();
  },

  createFrames: function(){
    // loop through start and end keys
    for(var i = 0; i < this.keys.length-1; i++){
      var startTime = this.keys[i];
      var endTime = this.keys[i+1];
      var timeDiff = endTime - startTime;
      var startKeyframe = App.keyframes.reel[startTime];
      var endKeyframe = App.keyframes.reel[endTime];

      // push frames
      for(j = startTime; j < endTime; j++){
        this.frames[j] = {
            target: App.keyframes.reel[endTime].target,
            x: startKeyframe.x + ((endKeyframe.x - startKeyframe.x) / timeDiff) * j,
            y: startKeyframe.y + ((endKeyframe.y - startKeyframe.y) / timeDiff) * j
          };
        }
      }
      return this.frames;
  }
};