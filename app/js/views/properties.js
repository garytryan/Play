define(['jquery', 'underscore', 'backbone','../kanvas/getProperties', '../templates/properties', '../libs/camelion/camelion'],
  function($, _, Backbone, getProperties, template, camelion){
    return Backbone.View.extend({
      tagName: 'ul',
      template: function(active){
                  var properties = [
                    {name: 'top', property: 'top', value: Math.round(active.top)},
                    {name: 'left', property: 'left', value: Math.round(active.left)},
                    {name: 'angle', property: 'angle', value: Math.round(active.angle)}
                  ];
                  switch(active.get('type')){
                    case 'Rect' || 'Triangle':
                      properties.push({name: 'height', property: 'height', value: Math.round(active.scaleY * active.height)},
                                      {name: 'width', property: 'width', value: Math.round(active.scaleX * active.width)});
                      break;
                    case 'Circle':
                      properties.push({name: 'radius', property: 'radius' ,value: Math.round(active.radius)});
                      break;
                    case 'Star':
                      properties.push({name: 'points', property: 'numPoints', value: active.numPoints});
                      properties.push({name: 'innerRadius', property: 'innerRadius', value: active.innerRadius});
                      properties.push({name: 'outerRadius', property: 'outerRadius', value: active.outerRadius});
                      break;
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
          this.$el.html([this.template(active), '<li><input type="color" data-property="fill" /></li>']);
        }
        return this.$el;
      },

      events: {
        'keyup input[type="text"]'   : 'inputHandler',
        'change input[type="range"]' : 'inputHandler',
        'change input[type="color"]' : 'inputHandler'
      },

      inputHandler: function(e){
        // modifies the active klass properties from the properties panel
        var activeKlass   = this.stage.getActiveObject(),
            property = $(e.target).data('property');

        // return a string if the property is color other wise transform string into text
        var value = property === 'fill'? $(e.target).val() : $(e.target).val() * 1;

        if(e.keyCode === 13 || e.type === 'change'){
          // transforms between height/width that users see and scale that fabric uses
          if(property === 'scaleX' || property === 'scaleY'){
            value /= activeKlass.get(property);
          }
          // radius has to be handled differently to ensure the bounding box gets updated
          if (property === 'radius'){
            activeKlass.setRadius(value);
          } else if(property === 'fill'){
            activeKlass.setFill(value);
          // for stars
          } else if (property === 'numPoints'){
            activeKlass.setNumPoints(value);
          } else if (property === 'innerRadius'){
            activeKlass.setInnerRadius(value);
          } else if (property === 'outerRadius'){
            activeKlass.setOuterRadius(value);
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

      colorHandler: function(e){
        var activeKlass = this.stage.getActiveObject(),
            value = e.target.value;
            var rgb = camelion.hexToRgb(value);
        activeKlass.setFill(value);
        this.stage.renderAll();
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