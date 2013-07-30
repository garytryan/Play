require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    json2: 'libs/json/json2',
    templates: 'templates',
    fabric: 'libs/fabric/fabric'
  }
});

require(['models/app'], function(App){
  new App();
});