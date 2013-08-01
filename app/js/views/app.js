define(['jquery', 'underscore', 'backbone', './kanvas', './toolbar', './reel', './properties', '../models/kanvas'],
  function($, _, Backbone, kanvasView, toolbarView, reelView, propertiesView, kanvasModel) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.stage = new kanvasModel();
      window.k = this.stage;
      this.render();
    },

    render: function(){
      var toolbar = new toolbarView({ model: this.stage });
      var reel = new reelView({ model: this.stage });
      var properties = new propertiesView({ model: this.stage });
      this.$el.append([
        toolbar.render(),
        properties.render(),
        reel.render()
      ]);
    }
  });
});