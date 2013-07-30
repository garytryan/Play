define(['jquery', 'underscore', 'backbone', 'views/app'],
  function($, _, Backbone, appView){
  return Backbone.Model.extend({
    initialize: function(){
      new appView();
    }
  });
});