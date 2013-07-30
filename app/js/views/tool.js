define(['jquery', 'underscore', 'backbone', 'text!templates/tool.html'],
  function($, _, Backbone, toolTemplate){
  return Backbone.View.extend({
    tagName: 'li',

    initialize: function(){
    },

    render: function(){
      var compliedTemplate = _.template(toolTemplate, { name: this.model.get('name') });
      return this.$el.html(compliedTemplate);
    },

    events: {
      'click': 'addKlass'
    },

    addKlass: function(){
      this.model.addKlass();
    }
  });
});