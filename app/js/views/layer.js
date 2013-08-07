define(['jquery', 'underscore', 'backbone', '../templates/timeline'],
  function($, _, Backbone, template){
  return Backbone.View.extend({
    className: 'layer',

    initialize: function(){
      _.bindAll(this, 'render', 'makeActive');
      this.stage = this.options.stage;
    },

    template: function(data){
      return template(data);
    },

    render: function(){
      return this.$el.html('<ul>A thing<ul>');
    },

    events: {
      'click' : 'makeActive',
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
    },

    makeActive: function(){
      this.stage.setActiveObject(this.model);
    }
  });
});