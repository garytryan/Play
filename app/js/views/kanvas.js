define(['../kanvas/getProperties', '../models/app'],
  function(getProperties, app){
  return Backbone.View.extend({
    el: '#kanvas',

    attributes: {
      'height': '400px',
      'width' : '800px'
    },

    kanvas: null,
    initialize: function(){
      this.kanvas = new fabric.Canvas(this.el);
    },

    render: function(){
      _(this.collection.models).each(function(klass){
        this.kanvas.add(new fabric.Rect( klass.get('properties') ));
      }, this);
      return this.kanvas;
    }
  });

  //   var kanvas = new fabric.Canvas('kanvas');

  //   var keyframeHandler = function(options){
  //     var keyframes = options.target.keyframes;
  //     var currentFrame = app.currentFrame;
  //     // create a new keyframe
  //     keyframes[currentFrame] = getProperties(options.target);

  //     // update the keyframe index array
  //     keyframes['index'].indexOf(currentFrame) === -1 && keyframes['index'].push(currentFrame);
  //     keyframes['index'].sort(function sortNumber(a,b) {return a - b;});
  //   };

  //   kanvas.on('object:modified', keyframeHandler);
  //   kanvas.on('object:added', keyframeHandler);
});