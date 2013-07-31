define(['jquery', 'underscore', 'backbone', '../models/klass'],
  function($, _, Backbone, klass){
  return Backbone.Collection.extend({
    model: klass
  });
});