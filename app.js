var App = {};

// create a wrapper around native canvas element (with id="c")
App.canvas = new fabric.Canvas('c');
App.currentFrame = 0;


// create a rectangle object
// var rect = new fabric.Rect({
//   left: 100, top: 100, fill: 'red', width: 20, height: 20
// });

// var circle = new fabric.Circle({
//   radius: 20, fill: 'green', left: 100, top: 100
// });
// var triangle = new fabric.Triangle({
//   width: 20, height: 30, fill: 'blue', left: 50, top: 50
// });

// "add" rectangle onto canvas
// canvas.add(rect, circle, triangle);