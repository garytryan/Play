define(['jquery', 'underscore', 'backbone', '../templates/tool'],
  function($, _, Backbone, template){
  return Backbone.View.extend({
    tagName: "ul",
    template: template({tools: [
      {name: 'Rectangle', type: 'Rect'},
      {name: 'Triangle',  type: 'Triangle'},
      {name: 'Circle',    type: 'Circle'}
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
      var type = $(e.target).data('type');
      var klass = function(){
        var result = new fabric[type]({top: 50, left:50, height:50, width:50, fill:'red'});
        result.keyframes = {0: {visible: false}, index:[0]};
        return result;
      };
      this.stage.add(klass());
    }
  });
});