define(['jquery', 'underscore', 'backbone','../kanvas/getProperties', '../templates/properties'],
  function($, _, Backbone, getProperties, template){
    return Backbone.View.extend({
      tagName: 'ul',
      template: function(active){
                  var properties = [
                    {name: 'top', value: Math.round(active.top)},
                    {name: 'left', value: Math.round(active.left)},
                    {name: 'angle', value: Math.round(active.angle)}
                  ];
                  switch(active.get('type')){
                    case 'Rect' || 'Triangle':
                      properties.push({name: 'height', value: Math.round(active.scaleY * active.height)},
                                      {name: 'width', value: Math.round(active.scaleX * active.width)});
                      break;
                    case 'Circle':
                      properties.push({name: 'radius', value: Math.round(active.radius)});
                  }
                  return template({properties: properties});
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
        }
        return this.$el;
      },

      events: {
        'keyup input[type="text"]'   : 'inputHandler',
        'change input[type="range"]' : 'inputHandler'
      },

      inputHandler: function(e){
        // modifies the active klass properties from the properties panel
        var activeKlass   = this.stage.getActiveObject(),
            property = $(e.target).data('property'),
            value    = $(e.target).val() * 1;

        if(e.keyCode === 13 || e.type === 'change'){
          // transforms between height/width that users see and scale that fabric uses
          if(property === 'scaleX' || property === 'scaleY'){
            value /= activeKlass.get(property);
          }
          // radius has to be handled differently to ensure the bounding box gets updated
          if (property === 'radius'){
            activeKlass.setRadius(value);
          } else {
           activeKlass.set(property,value);
          }
          activeKlass.setCoords();
          this.stage.renderAll();
          // sets a new keyframe on the active klass containing the modifications
          this.stage.trigger('object:modified', {target: activeKlass});
        }

        this.linkInputs(e, value);
      },

       linkInputs: function(e, value){
        if(e.type === 'change'){
          var prop = $(e.target).data('property');
          $('[data-property="' + prop + '"]').val(value);
        }

        if(e.keyCode === 13){
          var prop2 = $(e.target).data('property');
          $('[data-property="' + prop2 + '"]').val(value);
        }
      }

  });
});