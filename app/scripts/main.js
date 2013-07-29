require(["helper/util"], function(util){

});

requirejs.config({
  baseUrl : 'scripts/lib',
  paths: {
    app: '../app'
  }
});

// start the main app logic
requirejs(['jquery', 'canvas', 'app/sub'], function($, canvas, sub){
  
});