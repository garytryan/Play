define(['jquery', 'underscore', 'backbone', 'collections/toolbar', 'text!templates/tool.html'], function($, _, Backbone, toolbarCollection, toolTemplate){
  var toolbarView = Backbone.View.extend({
    tagName: "ul",
    initialize: function(){
      this.collection = new toolbarCollection([
        { name: "Square" },
        { name: "Circle" },
        { name: "Triangle" }
      ]);
    },
    render: function(){
      var compiledTemplate = _.template(toolTemplate, { tools : this.collection.models });
      return this.$el.append(compiledTemplate);
    }
  });
  return toolbarView;
});