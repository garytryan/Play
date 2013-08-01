define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = 
   '{{#each properties}}' +
   '<li>' +
   '<label>{{name}}</label>' +
   '<input type="text" data-property="{{name}}" value="{{value}}" ></input>' +
   '<input type="range" data-property="{{name}}" value="{{value}}" max="400" min="0" step="1"></input>' +
   '</li>' +
   '{{/each}}';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});