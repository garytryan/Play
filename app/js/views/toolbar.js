define(['jquery', 'underscore', 'backbone', 'collections/toolbar', './tool', '../models/klass'],
  function($, _, Backbone, toolbarCollection, toolView, klass){
  return Backbone.View.extend({
    tagName: "ul",
    template: '<li class="Rect">Rectangle</li>' +
              '<li class="Rect">Circle</li>' +
              '<li class="Triangle">Triganle</li>',

    initialize: function(){
    },

    render: function(){
      return this.$el.append(this.template);
    },

    events: {
      'click' : 'addKlass'
    },

    addKlass: function(){
      this.collection.add( new klass() );
    }
  });
});