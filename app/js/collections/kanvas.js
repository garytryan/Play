define(['jquery', 'underscore', 'backbone', '../models/klass'],
  function($, _, Backbone, klass){
  return Backbone.Collection.extend({
    model: klass,

    initialize: function(){
      this._meta = { currentFrame: 0 };
    },

    meta: function(prop, value){
      if(value === undefined){
        return this._meta[prop];
      } else {
        this._meta[prop] = value;
        this.trigger('change:' + prop, value);
      }
    }
  });
});