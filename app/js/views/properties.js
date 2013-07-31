define(['jquery', 'underscore', 'backbone', '../models/kanvas', '../kanvas/getProperties'],
  function($, _, Backbone, kanvas, getProperties){
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
        return this.$el.html([this.model.get('top'), this.model.get('left')]);
      },

      onFocus: function(klass){
        this.model.set({
          'top': klass.target.top,
          'left': klass.target.left
        });
      }

  });
});