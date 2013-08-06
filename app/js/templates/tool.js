define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = '{{#each tools}}<li class="toolBtn icon {{type}}" data-type="{{type}}"></object></li>{{/each}}';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});