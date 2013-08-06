define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = '<span class="icon playBtn"></span><div id="reelWrapper"><input type="range" id="range" max="6000" min="0" value="{{ currentFrame }}" step="10" /></div>';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});