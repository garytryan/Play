define(['jquery', 'underscore', 'backbone', 'views/menu'], function($, _, Backbone, menuView){
  var initialize = function(){
    new menuView();
  };

  return { initialize: initialize };
});