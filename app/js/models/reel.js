define(['jquery', 'underscore', 'backbone', './app'],
  function($, _, Backbone, app){
  return Backbone.Model.extend({
    initialize: function(){
      this.set({ 'frameNumber': 0 });
    },

    scrub: function(currentFrame){
      app.currentFrame = currentFrame;
    }
  });
});