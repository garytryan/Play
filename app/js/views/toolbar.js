define(['jquery', 'underscore', 'backbone', 'collections/toolbar', './tool', '../models/klass'],
  function($, _, Backbone, toolbarCollection, toolView, klass){
  return Backbone.View.extend({
    tagName: "ul",
    template: '<li data-type="Rect">Rectangle</li>' +
              '<li data-type="Circle">Circle</li>' +
              '<li data-type="Triangle">Triangle</li>',

    initialize: function(){
    },

    render: function(){
      return this.$el.append(this.template);
    },

    events: {
      'click' : 'addKlass'
    },

    addKlass: function(e){
      this.collection.add(new klass({ type: $(e.target).data('type') }));
    }
  });
});