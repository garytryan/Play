define(['jquery', 'underscore', 'backbone', './kanvas', './toolbar',
        './reel', './properties','../models/reel', '../collections/propertiesPanel',
        '../collections/kanvas'],
  function($, _, Backbone, kanvasView, toolbarView,
           reelView, propertiesView, reelModel, propertiesCollection,
           kanvasCollection) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.kanvas = new kanvasCollection([{type: 'Rect'}]);
      this.render();
    },

    render: function(){
      var kanvas = new kanvasView({ collection: this.kanvas });
      var toolbar = new toolbarView({ collection: this.kanvas });
      var reel = new reelView({ collection: this.kanvas });
      var properties = new propertiesView({ collection: new propertiesCollection([{name: "top", value: 0}, {name: "left", value: 1}]) });
      this.$el.append([
        kanvas.render(),
        toolbar.render(),
        properties.render(),
        reel.render()
      ]);
    }
  });
});