// var editShape = function(shape){
//   var focus = false;
//   var editing = false;

//   shape.on('mousedown', function(){
//     shape.setAttr('fill', 'green');
//     focus = true;
//     shapeLayer.draw();
//   });


//   App.stage.on('mousemove', function(){
//     if(focus){
//       if(cornerCollision(shape)){
//          App.stage.on('mousedown', function(){
//             editing = true;
//          });
//          App.stage.on('mouseup', function(){
//             editing = false;
//          });
//       }
//     }

//     if(focus && editing){
//         shape.setAttrs({
//           'fill' : 'red',
//           'width': App.stage.STAGE.mousePos.x  - shape.getAttr('x'),
//           'height': App.stage.STAGE.mousePos.y - shape.getAttr('y')
//         });
//       }
//       shapeLayer.draw();
//   });
// };

// fabric.Object.prototype.__eventListeners = {
//   selected: [function(options){ console.log(options.target) }]
// };
App.canvas.on('object:modified', function(options){
  var keyframes = options.target.keyframes;
  // keyframes[App.currentFrame] = options.target.originalState;
  var prop = {};
  prop['top'] = options.target.top;
  prop['left'] = options.target.left;
  keyframes[App.currentFrame] = prop;
  keyframes['index'].push(App.currentFrame * 1);
  keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
});