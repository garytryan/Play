define(['jquery', 'underscore', 'backbone', '../models/kanvas', '../kanvas/getProperties', 'text!templates/properties.html'],
  function($, _, Backbone, kanvas, getProperties, propertiesTemplate){
    return Backbone.View.extend({

      initialize: function(){
        _.bindAll(this, 'onFocus', 'render');
        kanvas.on('object:selected', this.onFocus);
        kanvas.on('object:modified', this.onFocus);
        kanvas.on('object:moving', this.onFocus);
        kanvas.on('object:scaling', this.onFocus);
        this.model.on('change', this.render);
      },

      render: function(){
        var compliedTemplate = _.template(propertiesTemplate, { properties: this.model.get('properties') });
        return this.$el.html(compliedTemplate);
      },

      onFocus: function(klass){
        this.model.set('properties',{
          'top'   : klass.target.top,
          'left'  : klass.target.left,
          'height': klass.target.height * klass.target.scaleY,
          'width' : klass.target.width * klass.target.scaleX,
        });
      }

  });
});