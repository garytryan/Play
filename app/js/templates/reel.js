define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = '<input type="range" id="range" max="6000" min="0" value="{{ currentFrame }}" step="10" />';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});