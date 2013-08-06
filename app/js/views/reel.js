define(['jquery', 'underscore', 'backbone', '../templates/reel'],
  function($, _, Backbone, template){
  return Backbone.View.extend({
    className: 'reel',

    initialize: function(){
      _.bindAll(this, 'render', 'play');
      this.stage = this.model.stage;
      this.stage.on('timeline:modified', this.render);
    },

    template: function(currentFrame){
      return template({ currentFrame: currentFrame });
    },

    render: function(){
      return this.$el.html(this.template(this.model.meta('currentFrame')));
    },

    events: {
      'change #range' : 'scrub',
      'click  .playBtn'  : 'play'
    },

    scrub: function(e){
      var currentFrame = e.currentTarget.value * 1;
      this.model.meta('currentFrame', currentFrame);
      var klass = this.stage.getObjects();
      for(var i = 0; i < klass.length; i++){
        klass[i].anim(currentFrame);
      }
      this.stage.renderAll();
    },

    play: function(){
      this.model.play();
    }
  });
});