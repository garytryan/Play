define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
  return Backbone.Model.extend({
    defaults: {
      properties: {
      "left"   : 100,
      "top"    : 100,
      "width"  : 100,
      "height" : 100,
      "fill"   : 'rgba(0,0,0,0.2)'
    }}
  });
});