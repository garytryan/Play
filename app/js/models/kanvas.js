define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
  return Backbone.Model.extend({
    initialize: function(){
      _.bindAll(this, 'addKeyframe', 'addKlass', 'meta', 'togglePlay', 'removeKlass');
      // instantiate a new canvas using fabric http://fabricjs.com/
      this.stage = new fabric.Canvas('kanvas', { backgroundColor: 'white' });
      // add meta storage to share the current frame
      this._meta = { currentFrame: 0, playState: 'paused' };

      // add new keyframes to a klass when it is added or modified
      this.stage.on('object:modified', this.addKeyframe );
      this.stage.on('object:added', this.addKeyframe );
      this.on('meta:currentFrame', this.updateFrame);
      this.removeKlass();
    },

    meta : function(prop, value){
        if(value === undefined){
          return this._meta[prop];
        } else {
          this._meta[prop] = value;
          this.trigger('meta:' + prop);
        }
    },

    addKeyframe: function(e){
      var klass        = e.target,
          keyframes    = klass.keyframes,
          currentFrame = this.meta('currentFrame');
      // add a new keyframe to the active klass
      keyframes[currentFrame] = this.makeKeyframe(klass);
      // update the keyframe index array
      keyframes['index'].indexOf(currentFrame) === -1 && keyframes['index'].push(currentFrame);
      keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
    },

    addKlass: function(type){
      var klass = new fabric[type](this.defaultKlass(type));
      // create keyframes
      var properties = this.defaultKlass(type);
      properties['visible'] = false;
      klass.keyframes ={0: properties, index:[0]};
      klass.set('type', type);
      this.stage.setActiveObject(klass);
      // uses farbic add method to insert modified klass objects onto the stage
      this.stage.add(klass);
    },

    defaultKlass: function(type){
      // set different default values for newly created klasses depending on the klass type
      var properties = {top: 80, left:80, fill:'black', opacity: 1 , visible: true};
      switch(type){
        case 'Rect' || 'Trinagle':
          properties['height'] = 80;
          properties['width']  = 80;
          break;
        case 'Circle':
          properties['radius'] = 40;
          break;
        case 'Star':
          properties['numPoints'] = 5;
          properties['innerRadius'] = 40;
          properties['outerRadius'] = 80;
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
      if(target.type === 'Circle'){
        keyframe['radius'] = target.radius;
      }
      else if (target.type === 'Star'){
        keyframe['numPoints'] = target.numPoints;
        keyframe['innerRadius'] = target.innerRadius;
        keyframe['outerRadius'] = target.outerRadius;
      }
      return keyframe;
    },

    togglePlay: function(){
      var currentPlayState = this.meta('playState');
      if(currentPlayState === 'playing'){
        this.meta('playState', 'paused');
      }
      if(currentPlayState === 'paused'){
        if(this.meta('currentFrame') === 200){
          this.meta('currentFrame', 0);
        }
        this.meta('playState', 'playing');
        this.play();
      }
    },

    play: function(){
      var self = this;
      var currentFrame = this.meta('currentFrame');
      if(currentFrame > 199){
        this.meta('playState', 'paused');
      }
      if(this.meta('playState') === 'paused'){
        this.meta('playState', 'paused');
      }
      if(this.meta('playState') === 'playing'){
        this.updateFrame();
        this.meta('currentFrame', ++currentFrame);
        setTimeout(this.play.bind(self), 33);
      }
    },

    updateFrame: function(){
      var currentFrame = this.meta('currentFrame');
      var klass = this.stage.getObjects();
      for(var i = 0; i < klass.length; i++){
        klass[i].anim(currentFrame);
      }
      this.stage.renderAll();
    },

    removeKlass: function(){
      var self = this;
      document.onkeydown = function(e) {
        evt = e || window.event;
        // evt.preventDefault();
        console.log(evt.keyCode);
        if (evt.keyCode == 82) {
          console.log('removing klass');
          self.stage.getActiveObject().remove();
        }
      };
    }
  });
});