App.addShape = {
  _shape: null,
  editable: false,
  defaultProp: {
    top: 50,
    left: 50,
    height: 100,
    width: 100,
    fill:        'blue',
    stroke:      'black',
    draggable:   'true'
  },

  init: function(type, properties, keyFrames){
    properties = properties || this.defaultProp;
    App.canvas.add(App.addKeys(new fabric[type](properties)));
  }
};





// var anim = new Kinetic.Animation(function(frame) {
//   var time = frame.time,
//       timeDiff = frame.timeDiff,
//       frameRate = frame.frameRate;

//   // update stuff
//   var shape = shapeLayer.children;
//   for(var i = 0; i < shapeLayer.children.length; i++){
//     shape[i].newFrame(time);
//   }
// }, shapeLayer);