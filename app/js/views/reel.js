define(['jquery', 'underscore', 'backbone'], 
  function($, _, Backbone, app){
  return Backbone.View.extend({
    className: 'reel',

    render: function(){
      return this.$el.html('<input type="range" id="range" max="6000" min="0" value="0" step="10" />');
    },

    events: {
      'change #range' : 'scrub'
    },

    scrub: function(e){
      this.model.scrub($(e.currentTarget).val());
    }
  });
});