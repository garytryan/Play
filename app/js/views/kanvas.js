define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  return Backbone.View.extend({
    tagName: 'canvas',
    className: 'kanvas',
    id: 'kanvas',
    initialize: function(){

    },
    render: function(){
      return this.$el;
    }
  });
});