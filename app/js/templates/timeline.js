define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = 
   '{{#klassi}}' +
   '<li>{{type}}' +
     '<ul>' +
       '{{#each keyframes.index}}<li>{{this}}</li>{{/each}}' +
     '</ul>' +
   '</li>' +
   '{{/klassi}}';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});