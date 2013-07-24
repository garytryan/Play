App.keyframes = {
  reel: {},

  add: function(target){
    this.reel[App.timebar.second] = {
      time: App.timebar.second,
      target: target,
      x: target.getAttr('x'),
      y: target.getAttr('y')
    };
  },

  getReel: function(){
    return this.reel;
  }
};