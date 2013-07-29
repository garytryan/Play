define(['jquery', 'underscore', 'backbone', './toolbar'], function($, _, Backbone, toolbarView) {
  var appView = Backbone.View.extend({
    el: '#container',
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.append(new toolbarView().render());
    }
  });
  return appView;
});