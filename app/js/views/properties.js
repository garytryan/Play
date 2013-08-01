define(['jquery', 'underscore', 'backbone', './kanvas', '../kanvas/getProperties', './property'],
  function($, _, Backbone, kanvas, getProperties, propertyView){
    return Backbone.View.extend({
      tagName: 'ul',

      initialize: function(){
        _.bindAll(this, 'render');
        this.model.on('object:selected', this.render);
        this.model.on('object:moving', this.render);
        this.model.on('object:scaling', this.render);
        this.model.on('object:rotaing', this.render);
      },

      render: function(){
        var active = this.model.getActiveObject();
        if(active !== undefined){
          this.$el.html('<input type="text" value="' + active.left + '" ></input>');
        } else {
          this.$el.html('<p>Nothing</p>');
        }
        return this.$el;
      },

      events: {
        'keyup input' : 'input'
      },

      input: function(e){
        var active = this.model.getActiveObject();
        if(e.keyCode === 13){
          active.set('left', $(e.target).val());
          active.setCoords();
          this.model.renderAll();
        }
      }


  });
});