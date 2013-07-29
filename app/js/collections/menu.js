define(['underscore', 'backbone', 'models/menuItem'], function(_, Backbone, menuItem){
  var menuCollection = Backbone.Collection.extend({
    model: menuItem
  });
  return menuCollection;
});