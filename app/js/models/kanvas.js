define(['../kanvas/getProperties'],
  function(getProperties){
  return Backbone.Model.extend({
    initialize: function(){
      // instantiate a new canvas using fabric http://fabricjs.com/
      this.stage = new fabric.Canvas('kanvas');
      // add meta storage to share the current frame
      this.stage._meta = { currentFrame: 0 };
      this.stage.meta = function(prop, value){
        if(value === undefined){
          return this._meta[prop];
        } else {
          this._meta[prop] = value;
          this.trigger('change:' + prop, value);
        }
      };
      // add new keyframes to a klass when it is added or modified
      _.bindAll(this, 'addKeyframe', 'addKlass');
      this.stage.on('object:modified', this.addKeyframe );
      this.stage.on('object:added', this.addKeyframe );
    },

    addKeyframe: function(e){
      var klass        = e.target,
          keyframes    = klass.keyframes,
          currentFrame = this.stage.meta('currentFrame');
      // add a new keyframe to the active klass
      keyframes[currentFrame] = this.makeKeyframe(klass);
      // update the keyframe index array
      keyframes['index'].indexOf(currentFrame) === -1 && keyframes['index'].push(currentFrame);
      keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
    },

    addKlass: function(type){
      var klass = new fabric[type](this.defaultKlass(type));
      // create keyframes
      klass.keyframes ={0: {visible: false}, index:[0]};
      klass.set('type', type);
      this.stage.setActiveObject(klass);
      // uses farbic add method to insert modified klass objects onto the stage
      this.stage.add(klass);
    },

    defaultKlass: function(type){
      // set different default values for newly created klasses depending on the klass type
      var properties = {top: 80, left:80, fill:'black', opacity: 0.2 , visible: true};
      switch(type){
        case 'Rect' || 'Trinagle':
          properties['height'] = 80;
          properties['width']  = 80;
          break;
        case 'Circle':
          properties['radius'] = 40;
          break;
      }
      return properties;
    },

    makeKeyframe: function(target){
      var keyframe = {};
      keyframe['top']     = target.top;
      keyframe['left']    = target.left;
      keyframe['scaleX']  = target.scaleX;
      keyframe['scaleY']  = target.scaleY;
      keyframe['angle']   = target.angle;
      keyframe['height']  = target.height;
      keyframe['width']   = target.width;
      keyframe['visible'] = true;
      keyframe['fill']    = target.fill;
      return keyframe;
    }

  });
});