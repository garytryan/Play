define(['jquery', 'underscore', 'backbone', '../templates/properties', '../templates/control'],
  function($, _, Backbone, propertiesTemplate, controlTemplate){
    return Backbone.View.extend({
      tagName: 'ul',
      className: 'properties',

      initialize: function(){
        _.bindAll(this, 'render', 'template');
        this.stage = this.model.stage;
        this.model.on('meta:currentFrame', this.render);
        this.stage.on('object:selected',   this.render);
        this.stage.on('selection:cleared', this.render);
        this.stage.on('play:end',          this.render);
        this.stage.on('object:moving',     this.render);
        this.stage.on('object:scaling',    this.render);
        this.stage.on('object:rotating',   this.render);
      },

      template: function(klass){
        var controlList = this.makeControlList(klass, this.stage);
        return propertiesTemplate(controlList);
      },

      render: function(){
        var active = this.stage.getActiveObject();
        if(active !== undefined && active !== null){
          return this.$el.html(this.template(active));
        }
        return this.$el.html('<span class="placeholder">Properties</span>');
      },

      events: {
        'keyup input[type="text"]'   : 'inputHandler',
        'change input[type="range"]' : 'inputHandler',
        'change input[type="color"]' : 'inputHandler'
      },

      inputHandler: function(e){
        // modifies the active klass properties from the properties panel
        var activeKlass   = this.stage.getActiveObject(),
            property = $(e.target).attr('name');

        // return a string if the property is color other wise transform string into text
        var value = property === 'fill'? $(e.target).val() : $(e.target).val() * 1;
        this.linkInputs(e, value);
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
      },

      linkInputs: function(e, value){
        if(e.type === 'change'){
          var prop = $(e.target).attr('name');
          $('[name="' + prop + '"]').val(value);
        }

        if(e.keyCode === 13){
          var prop2 = $(e.target).attr('name');
          $('[name="' + prop2 + '"]').val(value);
        }
      },

      makeControlList: function(klass, stage){
        var c = {
          fill:        {controls: [{ name: 'fill',        label: 'color',        type: 'color', value: klass.get('fill') }]},
          top:         {controls: [{ name: 'top',         label: 'top',          type: 'text',  value: Math.round(klass.get('top')) },                          { name: 'top',         type: 'range', value: Math.round(klass.get('top')),                          attrs:[{ type: 'min', value: 0 }, {type: 'max', value: stage.height }, { type: 'step', value: 1}] }]},
          left:        {controls: [{ name: 'left',        label: 'left',         type: 'text',  value: Math.round(klass.get('left')) },                         { name: 'left',        type: 'range', value: Math.round(klass.get('top')),                          attrs:[{ type: 'min', value: 0 }, {type: 'max', value: stage.width }, { type: 'step', value: 1}] }]},
          width:       {controls: [{ name: 'height',      label: 'width',        type: 'text',  value: Math.round(klass.get('scaleX') * klass.get('height')) }, { name: 'height',      type: 'range', value: Math.round(klass.get('scaleX') * klass.get('height')), attrs:[{ type: 'min', value: 0 }, {type: 'max', value: stage.width }, { type: 'step', value: 1}] }]},
          height:      {controls: [{ name: 'width',       label: 'height',       type: 'text',  value: Math.round(klass.get('scaleY') * klass.get('width')) },  { name: 'width',       type: 'range', value: Math.round(klass.get('scaleY') * klass.get('width')),  attrs:[{ type: 'min', value: 0 }, {type: 'max', value: stage.width }, { type: 'step', value: 1}] }]},
          points:      {controls: [{ name: 'numPoints',      label: 'points',       type: 'text',  value: klass.get('numPoints') },                             { name: 'numPoints',   type: 'range', value: '0',                                                   attrs:[{ type: 'min', value: 0 }, {type: 'max', value: 12 }, { type: 'step', value: 1}] }]},
          innerRadius: {controls: [{ name: 'innerRadius', label: 'inner radius', type: 'text',  value: Math.round(klass.get('innerRadius')) },                  { name: 'innerRadius', type: 'range', value: Math.round(klass.get('innerRadius')),                  attrs:[{ type: 'min', value: 0 }, {type: 'max', value: stage.width }, { type: 'step', value: 1}] }]},
          outerRadius: {controls: [{ name: 'outerRadius', label: 'outer radius', type: 'text',  value: Math.round(klass.get('outerRadius')) },                  { name: 'outerRadius', type: 'range', value: Math.round(klass.get('innerRadius')),                  attrs:[{ type: 'min', value: 0 }, {type: 'max', value: stage.width }, { type: 'step', value: 1}] }]},
          radius:      {controls: [{ name: 'radius',      label: 'radius',       type: 'text',  value: Math.round(klass.get('radius')) },                       { name: 'radius',      type: 'range', value: Math.round(klass.get('radius')),                       attrs:[{ type: 'min', value: 0 }, {type: 'max', value: stage.width }] }]},
          angle:       {controls: [{ name: 'angle',       label: 'angle',        type: 'text',  value: Math.round(klass.get('angle')) },                        { name: 'angle',       type: 'range', value: Math.round(klass.get('angle')),                        attrs:[{ type: 'min', value: 0 }, {type: 'max', value: 800}] }]}
        };

        var controlList = { fill: c.fill, top: c.top, left: c.left};
        if(klass.type === 'Rect' || klass.type === 'Triangle'){
          controlList['height'] = c.height;
          controlList['width']  = c.width;
          controlList['angle']  = c.angle;
        }
        if(klass.type === 'Star'){
          controlList['points']      = c.points;
          controlList['innerRadius'] = c.innerRadius;
          controlList['outerRadius'] = c.outerRadius;
          controlList['angle']       = c.angle;
        }
        if(klass.type === 'Circle'){
          controlList['radius'] = c.radius;
        }

        return controlList;
      }
  });
});