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

App.addShape.init('Rect', {
  top: 300, left: 300, height: 50, width: 50, fill: 'blue'
});

App.addShape.init('Rect', {
  top: 100, left: 100, height: 50, width: 50, fill: 'red'
});


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