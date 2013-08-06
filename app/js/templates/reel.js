define(['../libs/handlebars/handlebars'],
  function(){
  var source = '<span class="icon playBtn {{playState}}"></span><div id="reelWrapper"><input type="range" id="range" max="200" min="0" value="{{currentFrame}}" step="1" /></div>';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});