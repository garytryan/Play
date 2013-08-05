define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = 
   '{{#klassi}}' +
   '<li>{{type}}' +
     '<ul>' +
       '{{#each keyframes.index}}<li class="timestamp" data-frame="{{this}}">{{this}}</li>{{/each}}' +
     '</ul>' +
   '</li>' +
   '{{/klassi}}';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});