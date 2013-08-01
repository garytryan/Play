define(['../kanvas/getProperties', '../models/app'],
  function(getProperties, app){
  return Backbone.View.extend({
    el: '#kanvas',

    attributes: {
      'height': '400px',
      'width' : '800px'
    },

    initialize: function(){
    },

  });
});