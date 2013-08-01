define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
  return Backbone.View.extend({
    tagName: "ul",
    template: '<li data-type="Rect">Rectangle</li>' +
              '<li data-type="Circle">Circle</li>' +
              '<li data-type="Triangle">Triangle</li>',

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