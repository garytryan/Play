define(['../libs/handlebars/handlebars'], function(handlebars){
  var source = '<li>'+
               '{{#each controls}}'+
               '{{#if this.label}}<label>{{this.label}}</label>{{/if}}'+
               '<input name="{{this.name}}" type="{{this.type}}" value="{{this.value}}"'+
                 '{{#each this.attrs}}'+
                   '{{this.type}}="{{this.value}}"'+
                 '{{/each}}'+
               '/>'+
               '{{/each}}'+
               '</li>';
  var template = Handlebars.compile(source);
  return function(context){
    return template(context);
  };
});