define(['underscore', 'backbone', 'kanvas'],
  function(_, Backbone, kanvas){
  return Backbone.Model.extend({

    addKlass: function(){
      var type = this.get('type');
      kanvas.add(new fabric[type](this.properties(type)));
    },

    properties: function(type){
      result = {top: 100, left: 100, stroke: 'grey', strokeWidth: 0.5, fill: 'rgba(0,0,0,0.1)', visible: true};
      switch(type) {
        case 'Rect' || 'Triangle':
          result.height = 100; result.width = 100;
          break;
        case 'Circle':
          result.radius = 50;
          break;
      }
      return result;
    }
  });
});