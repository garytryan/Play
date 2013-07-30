define(['jquery', 'underscore', 'backbone', './toolbar', './reel', '../models/reel'],
  function($, _, Backbone, toolbarView, reelView, reelModel) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.render();
    },
    render: function(){
      var toolbar = new toolbarView();
      var reel = new reelView({ model: new reelModel() });
      this.$el.append([
        toolbar.render(),
        reel.render()
      ]);
    }
  });
});