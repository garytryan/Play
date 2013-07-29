define(['underscore', 'backbone'], function(_, Backbone){
  var toolModel = Backbone.Model.extend({
    defaults: function(){
      return {
        name: '...'
      };
    }
  });
  return toolModel;
});