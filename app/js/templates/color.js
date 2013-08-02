define(['../libs/handlebars/handlebars'], function(handlebars){
  var source =
   '<li>' +
   '<label>{{name}}</label>' +
   '<li><input type="color" data-property="{{property}}" value="{{value}}"/></li>' +
   '</li>';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});