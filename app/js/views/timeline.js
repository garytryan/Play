define(['jquery', 'underscore', 'backbone', '../templates/timeline', './layer'],
  function($, _, Backbone, template, layerView){
  return Backbone.View.extend({
    className: 'timeline',

    initialize: function(){
      this.stage = this.model.stage;
      _.bindAll(this, 'render');
      this.stage.on('object:added', this.render);
      this.stage.on('object:modified', this.render);
      this.stage.on('object:removed', this.render);
    },

    template: function(data){
      return template(data);
    },

    render: function(){
      var klassi = this.stage.getObjects();
      return this.$el.html(_.map(klassi, function(klass){
        return new layerView({ model: klass, kanvas: this.model}).render();
      }, this));
    }
  });
});