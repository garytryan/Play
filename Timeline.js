var second = 0;

$(function(){
  $('#slide').on('change', function(){
    second = this.value;
    updateDisplay(second);
  });
});


// take a snap shot at 0
// move time bar
// move shape
// take snap shot of shape

App.keyframes = {

  reel: {},

  add: function(target){
    this.reel[second] = {
      target: target,
      x: target.getAttr('x'),
      y: target.getAttr('y')
    };
  }
};

