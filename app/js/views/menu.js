define(['jquery', 'underscore', 'backbone', 'collections/menu', 'text!templates/menu.html'], function($, _, Backbone, menuCollection, menuTemplate){
  var menuView = Backbone.View.extend({
    el: $('#container'),
    initialize: function(){
      this.collection = new menuCollection();
      this.collection.add({ title: "Square" });
      this.render();
    },
    render: function(){
      var compiledTemplate = _.template(menuTemplate, { menuItems : this.collection.models });
      this.$el.html(compiledTemplate);
    }
  });
  return menuView;
});