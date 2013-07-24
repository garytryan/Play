App.play = {
  reel: App.keyframes.getReel(),
  timeStampes: [],

  init: function(){
    for(var k in this.reel){
      this.timeStampes.push(k);
    }
    this.timeStampes.sort();
  },

  tween: function(){
    this.play = new Kinetic.Tween({
       node: this.reel[0].target,
       duration: this.timeStampes[1] - this.timeStampes[0],
       x: this.reel[0].x,
       y: this.reel[0].y
    }).play();
  }
};