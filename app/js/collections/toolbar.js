define(['underscore', 'backbone', 'models/tool'], function(_, Backbone, tool){
  var toolbarCollection = Backbone.Collection.extend({
    model: tool
  });
  return toolbarCollection;
});