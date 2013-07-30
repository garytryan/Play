define(['jquery', 'underscore', 'backbone', './toolbar', './kanvas'],
  function($, _, Backbone, toolbarView, kanvasView) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.render();
    },
    render: function(){
      var toolbar = new toolbarView();
      this.$el.append([
        toolbar.render()
      ]);
    }
  });
});