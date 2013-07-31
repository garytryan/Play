define(['jquery', 'underscore', 'backbone', './toolbar', './reel', './properties','../models/reel', '../models/properties'],
  function($, _, Backbone, toolbarView, reelView, propertiesView, reelModel, propertiesModel) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.render();
    },
    render: function(){
      var toolbar = new toolbarView();
      var reel = new reelView({ model: new reelModel() });
      var properties = new propertiesView({ model: new propertiesModel() });
      this.$el.append([
        toolbar.render(),
        properties.render(),
        reel.render()
      ]);
    }
  });
});