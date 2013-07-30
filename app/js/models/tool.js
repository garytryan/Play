define(['underscore', 'backbone', 'kanvas'], 
  function(_, Backbone, kanvas){
  return Backbone.Model.extend({
    defaults: function(){
      return {
        name: '...'
      };
    },

    addKlass: function(){
      console.log(kanvas);
      kanvas.add(new fabric['Rect']({top: 100, left:100, height:100, width:100, fill:'red'}));
    }
  });
});