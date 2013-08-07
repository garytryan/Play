define(['jquery', 'underscore', 'backbone', '../templates/layer'],
  function($, _, Backbone, template){
  return Backbone.View.extend({
    className: 'layer',
    tagName: 'li',

    initialize: function(){
      _.bindAll(this, 'render', 'makeActive');
      this.kanvas = this.options.kanvas;
      this.stage = this.kanvas.stage;
    },

    template: function(data){
      return template(data);
    },

    render: function(){
      return this.$el.html(template({ klassi: this.model }));
    },

    events: {
      'click' : 'makeActive',
      'click .timestamp' : 'changeFrame'
    },

    changeFrame: function(e){
      var currentFrame = $(e.target).data('frame') * 1;
      this.kanvas.meta('currentFrame', currentFrame);
      this.makeActive();
    },

    makeActive: function(){
      this.stage.setActiveObject(this.model);
    }
  });
});