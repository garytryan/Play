define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
  return Backbone.View.extend({
    className: 'reel',

    initialize: function(){
      this.stage = this.model.stage;
    },

    render: function(){
      return this.$el.html('<input type="range" id="range" max="6000" min="0" value="0" step="10" />');
    },

    events: {
      'change #range' : 'scrub'
    },

    scrub: function(e){
      var currentFrame = e.currentTarget.value * 1;
      this.stage.meta('currentFrame', currentFrame);
      var klass = this.stage.getObjects();
      for(var i = 0; i < klass.length; i++){
        klass[i].anim(currentFrame);
      }
      this.stage.renderAll();
      // this.stage.trigger('modified');
    }
  });
});