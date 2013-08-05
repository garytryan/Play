define(['jquery', 'underscore', 'backbone', './toolbar', './reel', './properties', './timeline', '../models/kanvas'],
  function($, _, Backbone, toolbarView, reelView, propertiesView, timelineView, kanvasModel) {
  return Backbone.View.extend({
    el: '#controlPanel',

    initialize: function(){
      this.stage = new kanvasModel();
      this.toolbar = new toolbarView({ model: this.stage });
      this.reel = new reelView({ model: this.stage });
      this.properties = new propertiesView({ model: this.stage });
      this.timeline = new timelineView({ model: this.stage });

      var star = this.stage.addKlass('Star');
      // this.addKeyframe({target: star});
      this.stage.meta('currentFrame', 100);
      this.stage.stage.getObjects()[0].set({left:100, top:100});
      this.stage.meta('currentFrame', 400);

      // this.stage._meta = {currentFrame: 500};
      this.stage.stage.getObjects()[0].set({left:100, top:100});

      this.render();
    },

    render: function(){
      this.$el.append([
        this.toolbar.render(),
        this.properties.render(),
        this.reel.render(),
        this.timeline.render()
      ]);
    }
  });
});