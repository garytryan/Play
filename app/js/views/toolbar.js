define(['jquery', 'underscore', 'backbone', '../templates/tool'],
  function($, _, Backbone, template){
  return Backbone.View.extend({
    tagName: "ul",
    template: template({tools: [
      {name: 'Rectangle', type: 'Rect'},
      {name: 'Triangle',  type: 'Triangle'},
      {name: 'Circle',    type: 'Circle'},
      {name: 'Star',    type: 'Star'}
    ]}),

    initialize: function(){
      this.stage = this.model.stage;
    },

    render: function(){
      return this.$el.append(this.template);
    },

    events: {
      'click' : 'addKlass'
    },

    addKlass: function(e){
      this.model.addKlass($(e.target).data('type'));
    }
  });
});