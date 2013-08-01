define(['jquery', 'underscore', 'backbone', './kanvas', '../kanvas/getProperties'],
  function($, _, Backbone, kanvas, getProperties){
    return Backbone.View.extend({
      tagName: 'ul',

      initialize: function(){
        _.bindAll(this, 'render');
        this.model.on('object:selected', this.render);
        this.model.on('selection:cleared', this.render);
        this.model.on('change:currentFrame', this.render);
        this.model.on('object:moving', this.render);
        this.model.on('object:scaling', this.render);
        this.model.on('object:rotating', this.render);
      },

      render: function(){
        var active = this.model.getActiveObject();
        if(active !== undefined && active !== null){
          this.$el.html(
            '<input type="text" data-property="left" value="' + Math.ceil(active.left) + '" ></input>'+
            '<input type="text" data-property="top" value="' + Math.ceil(active.top) + '" ></input>'+
            '<input type="text" data-property="scaleX" value="' + Math.ceil(active.scaleX * active.height) + '" ></input>'+
            '<input type="text" data-property="scaleY" value="' + Math.ceil(active.scaleY * active.width) +'" ></input>'+
            '<input type="text" data-property="angle" value="' + Math.ceil(active.angle) + '" ></input>'
            );
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
          var property = $(e.target).data('property');
          var val = $(e.target).val() * 1;
          if(property === 'scaleX'){
            val /= active.get('width');
          } else if (property === 'scaleY'){
            val /= active.get('height');
          }
          active.set(property,val);
          active.setCoords();
          this.model.renderAll();
          this.model.trigger('object:modified', {target: active});
        }

      }


  });
});