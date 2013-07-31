define(['jquery', 'underscore', 'backbone', './kanvas', './toolbar', 
        './reel', './properties','../models/reel', '../collections/propertiesPanel',
        '../collections/kanvas'],
  function($, _, Backbone, kanvasView, toolbarView, 
           reelView, propertiesView, reelModel, propertiesCollection,
           kanvasCollection) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.render();
    },
    render: function(){
      var kanvas = new kanvasView({ collection: new kanvasCollection([{type: 'Rect'}]) });
      var toolbar = new toolbarView();
      var reel = new reelView({ model: new reelModel() });
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