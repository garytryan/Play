
var cornerCollision = function(shape){

      var prop = {
        h: shape.getAttr('height'),
        w: shape.getAttr('width'),
        x: shape.getAttr('x'),
        y: shape.getAttr('y')
      };

      var sX = App.stage.STAGE.mousePos.x;
      var sY = App.stage.STAGE.mousePos.y;
      var r = 50;

        // top-left
      if((sX > prop.x - r && sX < prop.x + r) && 
         (sY > prop.y - r && sY < prop.y + r)){
        return true;
      }
      // top-right
      if((sX > prop.x + prop.w - r && sX < prop.x + prop.w + r) && 
         (sY > prop.y - r && sY < prop.y + r)){
        return true;
      }
      // bottom-left
      if((sX > prop.x - r && sX < prop.x + r) && 
         (sY > prop.y + prop.h - r && sY < prop.y + prop.h + r)){
        return true;
      }
      // bottom-right
      if((sX > prop.x + prop.w - r && sX < prop.x + prop.w + r) && 
         (sY > prop.y + prop.h - r && sY < prop.y + prop.h + r)){
        return true;
      }

      return false;
};