define(['jquery', 'underscore', 'backbone','../kanvas/getProperties'],
  function($, _, Backbone, getProperties){
    return Backbone.View.extend({
      tagName: 'ul',

      initialize: function(){
        _.bindAll(this, 'render');
        this.stage = this.model.stage;
        this.stage.on('object:selected', this.render);
        this.stage.on('selection:cleared', this.render);
        this.stage.on('change:currentFrame', this.render);
        this.stage.on('object:moving', this.render);
        this.stage.on('object:scaling', this.render);
        this.stage.on('object:rotating', this.render);
      },

      render: function(){
        var active = this.stage.getActiveObject();
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
        var active = this.stage.getActiveObject();
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
          this.stage.renderAll();
          this.stage.trigger('object:modified', {target: active});
        }

      }


  });
});