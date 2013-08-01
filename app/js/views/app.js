define(['jquery', 'underscore', 'backbone', './kanvas', './toolbar',
        './reel', './properties','../models/reel', '../collections/propertiesPanel',
        '../collections/kanvas'],
  function($, _, Backbone, kanvasView, toolbarView,
           reelView, propertiesView, reelModel, propertiesCollection,
           kanvasCollection) {
  return Backbone.View.extend({
    el: '#container',
    initialize: function(){
      _.bindAll(this, 'addKeyframe');
      this.stage = new fabric.Canvas('kanvas');
      this.kanvas = this.stage._objects;
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
      this.render();
    },

    render: function(){
      var kanvas = new kanvasView({ collection: this.kanvas });
      var toolbar = new toolbarView({ model: this.stage });
      var reel = new reelView({ model: this.stage });
      var properties = new propertiesView({ collection: new propertiesCollection([{name: "top", value: 0}, {name: "left", value: 1}]) });
      this.$el.append([
        kanvas.render(),
        toolbar.render(),
        properties.render(),
        reel.render()
      ]);
    },

    addKeyframe: function(klass){
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
      console.log(klass);
    }
  });
});