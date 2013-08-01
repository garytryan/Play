define(['../kanvas/getProperties'],
  function(getProperties){
  return Backbone.Model.extend({
    initialize: function(){
      _.bindAll(this, 'addKeyframe');
      this.stage = new fabric.Canvas('kanvas');
      this.stage._meta = { currentFrame: 0 };
      this.stage.meta = function(prop, value){
        if(value === undefined){
          return this._meta[prop];
        } else {
          this._meta[prop] = value;
          this.trigger('change:' + prop, value);
        }
      };
      this.stage.on('object:modified', this.addKeyframe );
      this.stage.on('object:added', this.addKeyframe );
    },

    addKeyframe: function(klass){
      console.log('addKeyframe');
      var keyframes    = klass.target.keyframes,
          currentFrame = this.stage.meta('currentFrame');
      // create a new keyframe
      var getProperties = function(target){
        var prop = {};
        prop['top']     = target.top;
        prop['left']    = target.left;
        prop['scaleX']  = target.scaleX;
        prop['scaleY']  = target.scaleY;
        prop['angle']   = target.angle;
        prop['height']  = target.height;
        prop['width']   = target.width;
        prop['visible'] = true;
        return prop;
      };
      keyframes[currentFrame] = getProperties(klass.target);
      // update the keyframe index array
      keyframes['index'].indexOf(currentFrame) === -1 && keyframes['index'].push(currentFrame);
      keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
    }
  });
});