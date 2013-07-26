$(function(){
  var $frame = $('#frame');
  $('[type="range"]').on('change', function(){
    App.currentFrame = this.value * 1;
    $frame.html(this.value);
    var klass = App.canvas.getObjects();
    for(var i = 0; i < klass.length; i++){
      klass[i].anim(App.currentFrame);
    }
  });
});