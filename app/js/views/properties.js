define(['jquery', 'underscore', 'backbone', './kanvas', '../kanvas/getProperties', './property'],
  function($, _, Backbone, kanvas, getProperties, propertyView){
    return Backbone.View.extend({
      tagName: 'ul',

      initialize: function(){
        _.bindAll(this, 'onFocus', 'render');
        // kanvas.on('object:selected', this.onFocus);
        // kanvas.on('object:modified', this.onFocus);
        // kanvas.on('object:moving', this.onFocus);
        // kanvas.on('object:scaling', this.onFocus);
        this.collection.on('change', this.render);
      },

      render: function(){
        return this.$el.append(_(this.collection.models).map(function(propertyModel){
          var thing = new propertyView({ model: propertyModel }).render();
          return thing;
        }));
      },

      onFocus: function(klass){
        this.model.set('properties',{
          'top'   : klass.target.top,
          'left'  : klass.target.left,
          'height': klass.target.height * klass.target.scaleY,
          'width' : klass.target.width * klass.target.scaleX
        });
      }

  });
});