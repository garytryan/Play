define(['jquery', 'underscore', 'backbone', '../templates/properties', '../templates/color'],
  function($, _, Backbone, template, colorTemplate){
    return Backbone.View.extend({
      tagName: 'ul',
      className: 'properties',

      initialize: function(){
        _.bindAll(this, 'render');
        this.stage = this.model.stage;
        this.model.on('meta:currentFrame', this.render);
        this.stage.on('object:selected', this.render);
        this.stage.on('selection:cleared', this.render);
        this.stage.on('play:end', this.render);
        this.stage.on('object:moving', this.render);
        this.stage.on('object:scaling', this.render);
        this.stage.on('object:rotating', this.render);
      },

      template: function(active){
                  var properties = [
                    {name: 'top', property: 'top', value: Math.round(active.top), max: this.stage.height, min: 0, step:1},
                    {name: 'left', property: 'left', value: Math.round(active.left), max: this.stage.width, min: 0, step:1},
                    {name: 'angle', property: 'angle', value: Math.round(active.angle), max: 400, min: 0, step:1}
                  ];
                  switch(active.get('type')){
                    case 'Rect' || 'Triangle':
                      properties.push({name: 'height', property: 'height', value: Math.round(active.scaleY * active.height), max: 2000, min: 0, step:1},
                                      {name: 'width', property: 'width', value: Math.round(active.scaleX * active.width),  max: 2000, min: 0, step:1});
                      break;
                    case 'Circle':
                      properties.push({name: 'radius', property: 'radius' ,value: Math.round(active.radius), max: 1000, min: 0, step:1});
                      break;
                    case 'Star':
                      properties.push({name: 'points', property: 'numPoints', value: active.numPoints, max: 80, min: 2, step:1});
                      properties.push({name: 'innerRadius', property: 'innerRadius', value: active.innerRadius, max: 1000, min: 0, step:1});
                      properties.push({name: 'outerRadius', property: 'outerRadius', value: active.outerRadius,  max: 1000, min: 0, step:1});
                      break;
                  }
                  return template({properties: properties});
                },

      colorTemplate: function(active){
        return colorTemplate({ name:'color', property:'fill', value: active.fill });
      },

      render: function(){
        var active = this.stage.getActiveObject();
        if(active !== undefined && active !== null){
          this.$el.html([this.template(active), this.colorTemplate(active)]);
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