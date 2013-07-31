define(['jquery', 'underscore', 'backbone', './toolbar', './reel', './properties','../models/reel', '../collections/propertiesPanel'],
  function($, _, Backbone, toolbarView, reelView, propertiesView, reelModel, propertiesCollection) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.render();
    },
    render: function(){
      var toolbar = new toolbarView();
      var reel = new reelView({ model: new reelModel() });
      var properties = new propertiesView({ collection: new propertiesCollection([{name: "top", value: 0}, {name: "left", value: 1}]) });
      this.$el.append([
        toolbar.render(),
        properties.render(),
        reel.render()
      ]);
    }
  });
});