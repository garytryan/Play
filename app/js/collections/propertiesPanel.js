define(['jquery', 'underscore', 'backbone', '../models/property'], 
  function($, _, Backbone, property){
  return Backbone.Collection.extend({
    model: property
  });
});