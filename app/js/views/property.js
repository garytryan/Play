define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  return Backbone.View.extend({
    tagName: 'li',

    render: function(){
      return this.$el.append('Property');
    }
  });
});