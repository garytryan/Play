var editShape = function(shape){
  editable = false;

  shape.on('mousedown', function(){
    shape.setAttr('fill', 'green');
    editable = true;
  });

  App.stage.on('mousemove', function(){
    if(editable){

      var prop = {
        h: shape.getAttr('height'),
        w: shape.getAttr('width'),
        x: shape.getAttr('x'),
        y: shape.getAttr('y')
      };

      var sX = App.stage.STAGE.mousePos.x;
      var sY = App.stage.STAGE.mousePos.y;
      var r = 20;

      // top-left
      if((sX > prop.x - r && sX < prop.x + r) && 
         (sY > prop.y - r && sY < prop.y + r)){
        console.log('top-left');
      }
      // top-right
      if((sX > prop.x + prop.w - r && sX < prop.x + prop.w + r) && 
         (sY > prop.y - r && sY < prop.y + r)){
        console.log('top-right');
        
      }
      // bottom-left
      if((sX > prop.x - r && sX < prop.x + r) && 
         (sY > prop.y + prop.h - r && sY < prop.y + prop.h + r)){
        console.log('bottom-left');
      }
      // bottom-right
      if((sX > prop.x + prop.w - r && sX < prop.x + prop.w + r) && 
         (sY > prop.y + prop.h - r && sY < prop.y + prop.h + r)){
        console.log('bottom-right');
      }
    }
  });

};