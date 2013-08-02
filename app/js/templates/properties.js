define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = 
   '{{#each properties}}' +
   '<li>' +
   '<label>{{name}}</label>' +
   '<input type="text" data-property="{{property}}" value="{{value}}" ></input>' +
   '<input type="range" data-property="{{property}}" value="{{value}}" max="{{max}}" min="{{min}}" step="{{step}}"></input>' +
   '</li>' +
   '{{/each}}';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});