define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
  return Backbone.Model.extend({
    defaults: { properties: {
      "top":  0,
      "left": 0
    }}
  });
});