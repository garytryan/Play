define(['jquery', 'underscore', 'backbone', '../templates/reel'],
  function($, _, Backbone, template){
  return Backbone.View.extend({
    className: 'reel',

    initialize: function(){
      _.bindAll(this, 'render', 'play');
      this.stage = this.model.stage;
      this.stage.on('timeline:modified', this.render);
      this.model.on('meta:playState', this.render);
    },

    template: function(currentFrame, playState){
      return template({ currentFrame: currentFrame, playState: playState });
    },

    render: function(){
      return this.$el.html(this.template(this.model.meta('currentFrame'), this.model.meta('playState')));
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
      this.stage.trigger('scrub:scrubbing');
      this.stage.renderAll();
    },

    play: function(){
      this.model.togglePlay();
    }
  });
});