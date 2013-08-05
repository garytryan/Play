define(['jquery', 'underscore', 'backbone', '../templates/timeline'], 
  function($, _, Backbone, template){
  return Backbone.View.extend({
    className: 'timeline',

    initialize: function(){
      this.stage = this.model.stage;
      _.bindAll(this, 'render');
      this.stage.on('object:added', this.render);
      this.stage.on('object:modified', this.render);
    },

    template: function(data){
      return template(data);
    },

    render: function(){
      var data = {"klassi": this.stage.getObjects()};
      return this.$el.html(this.template(data));
    },

    events: {
      'click .timestamp' : 'changeFrame'
    },

    changeFrame: function(e){
      var currentFrame = $(e.target).data('frame') * 1;
      this.model.meta('currentFrame', currentFrame);
      var klass = this.stage.getObjects();
      for(var i = 0; i < klass.length; i++){
        klass[i].anim(currentFrame);
      }
      this.stage.renderAll();
      this.stage.trigger('timeline:modified');
    }
  });
});