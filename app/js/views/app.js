define(['jquery', 'underscore', 'backbone', './toolbar', './reel', './properties', '../models/kanvas'],
  function($, _, Backbone, toolbarView, reelView, propertiesView, kanvasModel) {
  return Backbone.View.extend({
    el: '#container',

    initialize: function(){
      this.stage = new kanvasModel();
      this.toolbar = new toolbarView({ model: this.stage });
      this.reel = new reelView({ model: this.stage });
      this.properties = new propertiesView({ model: this.stage });
      this.render();
    },

    render: function(){
      this.$el.append([
        this.toolbar.render(),
        this.properties.render(),
        this.reel.render()
      ]);
    }
  });
});