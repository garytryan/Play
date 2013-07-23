var updateDisplay = function(t){
  if(typeof App.keyframes.reel[t] !== "undefined"){
    App.keyframes.reel[t].target.setAttrs({
      'x': App.keyframes.reel[t].x,
      'y': App.keyframes.reel[t].y
    });
    shapeLayer.draw();
  }
};