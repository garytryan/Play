define(['jquery', 'underscore', 'backbone', 'views/app'], function($, _, Backbone, appView){
  var initialize = function(){
    new appView();
  };

  return { initialize: initialize };
});