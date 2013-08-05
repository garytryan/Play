define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
  return Backbone.View.extend({
    className: 'reel',

    initialize: function(){
      _.bindAll(this, 'render');
      this.stage = this.model.stage;
      this.stage.on('timeline:modified', this.render);
    },

    render: function(){
      return this.$el.html('<input type="range" id="range" max="6000" min="0" value="' + this.stage.meta('currentFrame') + '" step="10" />');
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
    }
  });
});