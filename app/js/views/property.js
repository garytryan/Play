define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  return Backbone.View.extend({
    tagName: 'li',

    initialize : function(){
      _.bindAll(this, 'render');
    },

    render: function(){
      return this.$el.append(this.model.get('values'));
    }
  });
});