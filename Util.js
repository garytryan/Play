// checks to see if an array holds a value
Array.prototype.contains = function(target){
  for(i = 0; i < this.length; i++){
    if(this[i] === target){
      return true;
    }
  }
  return false;
};

// returns a hash of a targets useful object properties
App.getProps = function(target){
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