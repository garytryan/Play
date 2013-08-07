define(['../libs/handlebars/handlebars'], function(handlebars){
  Handlebars.registerHelper('list', function(items){
    var out = '';
    for(var i = 0; i < items.length; i++){
      out += '<li class="timestamp" style="margin-left:' + Math.floor(items[i] / 2) + '%" data-frame="' + items[i] + '"></li>';
    }
    return out;
  });

  var source =
   '{{#klassi}}' +
     '<span class="icon {{type}}"></span>' +
     '<ul>' +
       '{{#list keyframes.index}}{{/list}}' +
     '</ul>' +
   '{{/klassi}}';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});