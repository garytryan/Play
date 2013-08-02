define(['../libs/handlebars/handlebars'], function(handlebars){
  var source =
   '<li>' +
   '<label>{{name}}</label>' +
   '<input type="color" data-property="{{property}}" value="{{value}}"/>' +
   '</li>';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});