define(['underscore', 'backbone'], function(_, Backbone){
  var menuItemModel = Backbone.Model.extend({
    defaults: function(){
      return {
        title: 'empty menu item'
      };
    }
  });
  return menuItemModel;
});