define(['underscore', 'backbone', './kanvas', '../kanvas/addKeys'],
  function(_, Backbone, kanvas, addKeys){
  return Backbone.Model.extend({

    addKlass: function(){
      var type = this.get('type');
      // For dev purposes
      window.k = kanvas;
      kanvas.add(addKeys(new fabric[type](this.properties(type))));
    },

    properties: function(type){
      result = { top: 100, left: 100, stroke: 'grey', strokeWidth: 1, fill: 'rgba(0,0,0,0.1)', visible: true };
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