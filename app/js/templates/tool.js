define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = '{{#each tools}}<li class="toolBtn icon" data-type="{{type}}">{{name}}</li>{{/each}}';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});