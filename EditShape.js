
App.editShape = {

  focus: false,
  editing: false,
  shape: null,

  init: function(shape){
    this.shape = shape;
    this.select();
    this.updateKeyframes();
  },

  select: function(){
    this.shape.on('mousedown', function(){
      this.setAttr('fill', 'green');
      this.focus = true;
      shapeLayer.draw();
    });
  },

  // Add edits to keyframes
  updateKeyframes: function(){
    this.shape.on('dragend', function(){
      App.keyframes.add(this);
    });
  }

  // Drag Corners to edit size of shape
  // App.stage.on('mousemove', function(){
  //   if(focus){
  //     if(cornerCollision(shape)){
  //        App.stage.on('mousedown', function(){
  //           editing = true;
  //        });
  //        App.stage.on('mouseup', function(){
  //           editing = false;
  //        });
  //     }
  //   }

  //   if(focus && editing){
  //       shape.setAttrs({
  //         'fill' : 'red',
  //         'width': App.stage.STAGE.mousePos.x  - shape.getAttr('x'),
  //         'height': App.stage.STAGE.mousePos.y - shape.getAttr('y')
  //       });
  //     }
  //     shapeLayer.draw();
  // });
};
