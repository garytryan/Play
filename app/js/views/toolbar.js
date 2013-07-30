define(['jquery', 'underscore', 'backbone', 'collections/toolbar', './tool'],
  function($, _, Backbone, toolbarCollection, toolView){
  return Backbone.View.extend({
    tagName: "ul",
    initialize: function(){
      this.collection = new toolbarCollection([
        { name: "Rectangle", type: "Rect" },
        { name: "Circle", type: "Circle" },
        { name: "Triangle", type: "Triangle"}
      ]);
    },

    render: function(){
      // var compiledTemplate = _.template(toolTemplate, { tools : this.collection.models });
      var toolViews = _(this.collection.models).map(function(toolModel){
        return new toolView({ model: toolModel }).render();
      });
      return this.$el.append(toolViews);
    }
  });
});