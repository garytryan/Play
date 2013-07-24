// var updateDisplay = function(t){
//   if(typeof App.keyframes.reel[t] !== "undefined"){
//     App.keyframes.reel[t].target.setAttrs({
//       'x': App.keyframes.reel[t].x,
//       'y': App.keyframes.reel[t].y
//     });
//     shapeLayer.draw();
//   }
// };

var updateDisplay = function(t){
  var thisFrame = App.stopFrame.frames[t];
  if(typeof thisFrame !== "undefined"){
    console.log('hello');
    thisFrame.target.setAttrs({
      'x': thisFrame.x,
      'y': thisFrame.y
    });
    shapeLayer.draw();
  }
};