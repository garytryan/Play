App.tween = {
  frames: new Array(120),

  createFrames: function(){
    var reel = App.keyframes.getReel();

    // loop through start and end keys
    for(var i = 0; i < reel.length-1; i++){
      var startTime = reel[i];
      var endTime = reel[i+1];
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