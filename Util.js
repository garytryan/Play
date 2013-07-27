// checks to see if an array holds a value
Array.prototype.contains = function(target){
  for(i = 0; i < this.length; i++){
    if(this[i] === target){
      return true;
    }
  }
  return false;
};