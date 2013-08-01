define(['jquery', 'underscore', 'backbone','../kanvas/getProperties', '../templates/properties'],
  function($, _, Backbone, getProperties, template){
    return Backbone.View.extend({
      tagName: 'ul',
      template: function(active){
                  return template({properties: [
                    {name: 'top', value: Math.round(active.top)},
                    {name: 'left', value: Math.round(active.left)},
                    {name: 'height', value: Math.round(active.scaleY * active.height)},
                    {name: 'width', value: Math.round(active.scaleX * active.width)},
                    {name: 'angle', value: Math.round(active.angle)}
                  ]});
                },

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
          this.$el.html(this.template(active));
        } else {
          this.$el.html('<p>Nothing</p>');
        }
        return this.$el;
      },

      events: {
        'keyup input[type="text"]'   : 'input',
        'change input[type="range"]' : 'input'
      },

      input: function(e){
        var active = this.stage.getActiveObject();
        if(e.keyCode === 13 || e.type === 'change'){
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