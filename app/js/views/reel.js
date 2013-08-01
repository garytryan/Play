define(['jquery', 'underscore', 'backbone', './kanvas'],
  function($, _, Backbone, kanvas){
  return Backbone.View.extend({
    className: 'reel',

    render: function(){
      return this.$el.html('<input type="range" id="range" max="6000" min="0" value="0" step="10" />');
    },

    events: {
      'change #range' : 'scrub'
    },

    scrub: function(e){
      var currentFrame = e.currentTarget.value * 1;
      this.model.meta('currentFrame', currentFrame);
      var klass = this.model.getObjects();
      for(var i = 0; i < klass.length; i++){
        klass[i].anim(currentFrame);
      }
      this.model.renderAll();
    }
  });
});