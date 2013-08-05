define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  return Backbone.View.extend({

    initialize: function(){
      this.stage = this.model.stage;
      _.bindAll(this, 'render');
      this.stage.on('object:added', this.render);
      this.stage.on('object:modified', this.render);
    },

    render: function(){
      var klassi = this.stage.getObjects();
      var template = '<h2>Timeline</h2>';
      _.each(klassi, function(klass){
        template += '<li>'+ klass.type +'</li>';
        template += '<ul>';
        _.each(klass.keyframes.index, function(timestamp){
          template += '<li class="timestamp" data-frame="' + timestamp + '">' + timestamp + '</li>';
        });
        template += '</ul>';
      });
      return this.$el.html(template);
    },

    events: {
      'click .timestamp' : 'changeFrame'
    },

    changeFrame: function(e){
      var currentFrame = $(e.target).data('frame') * 1;
      this.stage.meta('currentFrame', currentFrame);
      var klass = this.stage.getObjects();
      for(var i = 0; i < klass.length; i++){
        klass[i].anim(currentFrame);
      }
      this.stage.renderAll();
      this.stage.trigger('timeline:modified');
    }
  });
});