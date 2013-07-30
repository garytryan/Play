define(function(){
  return function(target){
    var prop = {};
    prop['top']     = target.top;
    prop['left']    = target.left;
    prop['scaleX']  = target.scaleX;
    prop['scaleY']  = target.scaleY;
    prop['angle']   = target.angle;
    prop['height']  = target.height;
    prop['width']   = target.width;
    prop['visible'] = true;
    return prop;
  };
});